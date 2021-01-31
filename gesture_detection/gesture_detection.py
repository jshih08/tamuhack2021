import numpy as np
import matplotlib.pyplot as plt
import cv2
from statistics import mean 

# swiper start swiping

# (720, 1280, 3)

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

cap = cv2.VideoCapture(0)

in_frame = False
draw = False

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

    cv2.imshow('img', cv2.resize(res2, (640, 360)))

    img_gray = cv2.cvtColor(res2, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(img_gray, (5, 5), cv2.BORDER_DEFAULT)

    cv2.imshow('img', cv2.resize(blurred, (640, 320)))

    ret, im = cv2.threshold(img_gray, 140, 255, cv2.THRESH_BINARY)

    # cv2.imshow('img', cv2.resize(im, (640, 320)))

    contours, hierarchy = cv2.findContours(im, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    filtered_contours = [contour for contour in filter(lambda c: cv2.contourArea(c) > 1000 and cv2.contourArea(c) < 400000, contours)]

    old_frame_status = in_frame

    if len(filtered_contours) > 0:
        x = [filtered_contours[0][i][0][0] for i in range(len(filtered_contours[0]))]
        y = [filtered_contours[0][i][0][1] for i in range(len(filtered_contours[0]))]
        minY = min(y)
        avgX = mean([x[match] for match in np.where(y == minY)[0]])
        if draw:
            cv2.circle(frame, (avgX, minY), 25, (0, 255, 0), -1)

        in_frame = inBounds(avgX, minY)

        if not old_frame_status == in_frame:
            if not in_frame:
                if leftOut(avgX):
                    print("Left Swipe")
                if rightOut(avgX):
                    print("Right Swipe")
                if topOut(minY):
                    print("Swipe Up")
                if bottomOut(minY):
                    print("Swipe Down")
            print("CHECK" if in_frame else "OUT")

        # print(f"Hand detected {'in' if in_frame else 'out of'} bounds.")
    else:
        in_frame = False
        # print("Hand not found")

    if draw:
        cv2.rectangle(frame, (320, 180), (960, 540), (255, 0, 0), 5)
        img = cv2.drawContours(frame, filtered_contours, -1, (0, 0, 255), 2) if len(filtered_contours) > 0 else frame
        resized_img = cv2.resize(img, (1280, 720))
        cv2.imshow('image',img)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
