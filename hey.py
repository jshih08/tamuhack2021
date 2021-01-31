from flask import Flask
from flask_socketio import SocketIO, send
import cv2
import sys

#Reads in the 33k lines of XML
haar_cascade = cv2.CascadeClassifier("haar_face.xml")

app = Flask(__name__)
app.config["SECRET_KEY"] = "mysecret"

socketIo = SocketIO(app, cors_allowed_origins="*")

app.debug = True

app.host = "localhost"

@socketIo.on('connect')
def on_connect():
    video_capture = cv2.VideoCapture(0)
    print('connected')
    counter = 0
    while True:
        # Capture frame-by-frame
        ret, frame = video_capture.read()

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        faces = haar_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=3,
        )

        if len(faces) > 0:
            counter += 1
            if counter > 30:
                print('found face')
                socketIo.emit('face')
                video_capture.release()
                cv2.destroyAllWindows()
                break
        if len(faces) == 0:
            counter = 0

@socketIo.on("message")
def handleMessage(msg):
    print(msg)
    send(msg, broadcast=True)
    return None

if __name__ == "__main__":
    socketIo.run(app)



