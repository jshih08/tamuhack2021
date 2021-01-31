from flask import Flask
from flask_socketio import SocketIO, send
import cv2
import sys
import numpy as np
import matplotlib.pyplot as plt
from statistics import mean 


def leftOut(x):
    return x < 320

def rightOut(x):
    return x > 960

def topOut(y):
    return y < 180

def bottomOut(y):
    return y > 540

def inBounds(x, y):
    return not (leftOut(x) or rightOut(x) or topOut(y) or bottomOut(y))

#Reads in the 33k lines of XML
haar_cascade = cv2.CascadeClassifier("haar_face.xml")

app = Flask(__name__)

socketIo = SocketIO(app, cors_allowed_origins="*")

app.debug = True

app.host = "localhost"

def processing():
  in_frame = False
  draw = False
  cap = cv2.VideoCapture(0)
  counter = 0

  while True:
      # Capture frame-by-frame
      ret, frame = cap.read()

      gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

      faces = haar_cascade.detectMultiScale(
          gray,
          scaleFactor=1.1,
          minNeighbors=3,
      )

      if len(faces) > 0:
          counter += 1
          if counter > 10:
              print('found face')
              socketIo.emit('face')
              socketIo.sleep(2)
              break
      if len(faces) == 0:
          counter = 0
  while(True):
    ret, frame = cap.read()

    Z = frame.reshape((-1,3))
    Z = np.float32(Z)

    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
    K = 2
    ret,label,center=cv2.kmeans(Z,K,None,criteria,10,cv2.KMEANS_RANDOM_CENTERS)

    center = np.uint8(center)
    res = center[label.flatten()]
    res2 = res.reshape((frame.shape))

    img_gray = cv2.cvtColor(res2, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(img_gray, (5, 5), cv2.BORDER_DEFAULT)
    ret, im = cv2.threshold(img_gray, 140, 255, cv2.THRESH_BINARY)
    contours, hierarchy = cv2.findContours(im, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    filtered_contours = [contour for contour in filter(lambda c: cv2.contourArea(c) > 1000 and cv2.contourArea(c) < 400000, contours)]

    old_frame_status = in_frame

    if len(filtered_contours) > 0:
        x = [filtered_contours[0][i][0][0] for i in range(len(filtered_contours[0]))]
        y = [filtered_contours[0][i][0][1] for i in range(len(filtered_contours[0]))]
        minY = min(y)
        avgX = mean([x[match] for match in np.where(y == minY)[0]])
        if draw:
            cv2.circle(frame, (avgX, minY), 50, (0, 255, 0), -1)

        in_frame = inBounds(avgX, minY)

        if not old_frame_status == in_frame:
            if not in_frame:
                if leftOut(avgX):
                    print("Left Swipe")
                    socketIo.emit('swipe_left')
                    socketIo.sleep(0)
                if rightOut(avgX):
                    print("Right Swipe")
                    socketIo.emit('swipe_right')
                    socketIo.sleep(0)
                if topOut(minY):
                    print("Swipe Up")
                    socketIo.emit('swipe_up')
                    socketIo.sleep(0)
                if bottomOut(minY):
                    print("Swipe Down")
                    socketIo.emit('swipe_down')
                    socketIo.sleep(0)
            print("CHECK" if in_frame else "OUT")
            if in_frame:
                socketIo.emit('check')
                socketIo.sleep(0)

        # print(f"Hand detected {'in' if in_frame else 'out of'} bounds.")
    else:
        in_frame = False

    if draw:
        cv2.rectangle(frame, (320, 180), (960, 540), (255, 0, 0), 5)
        img = cv2.drawContours(frame, filtered_contours, -1, (0, 0, 255), 2) if len(filtered_contours) > 0 else frame
        resized_img = cv2.resize(img, (1280, 720))
        cv2.imshow('image',img)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

  cap.release()
  cv2.destroyAllWindows()

@socketIo.on('connect')
def on_connect():
  print('connected')
  socketIo.start_background_task(target=processing)

@socketIo.on("message")
def handleMessage(msg):
    print(msg)
    send(msg, broadcast=True)
    return None

if __name__ == "__main__":
    socketIo.run(app)



