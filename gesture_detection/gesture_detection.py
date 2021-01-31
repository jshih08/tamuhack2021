import numpy as np
import matplotlib.pyplot as plt
import cv2
from statistics import mean 

# swiper start swiping

# def inBounds(x, y):
#     return not (x < 100 or x > 1820 or y < 100 or y > 980)

cap = cv2.VideoCapture(0)

# in_frame = False

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
    # cv2.imshow('img', cv2.resize(res2, (720, 450)))

    img_gray = cv2.cvtColor(res2, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(img_gray, (5, 5), cv2.BORDER_DEFAULT)
    ret, im = cv2.threshold(img_gray, 140, 255, cv2.THRESH_BINARY)
    # cv2.imshow('img', cv2.resize(im, (720, 450)))
    contours, hierarchy = cv2.findContours(im, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    filtered_contours = [contour for contour in filter(lambda c: cv2.contourArea(c) > 1000 and cv2.contourArea(c) < 400000, contours)]
    # old_frame_status = in_frame
    if len(filtered_contours) > 0:
        x = [filtered_contours[0][i][0][0] for i in range(len(filtered_contours[0]))]
        y = [filtered_contours[0][i][0][1] for i in range(len(filtered_contours[0]))]
        minY = min(y)
        avgX = mean([x[match] for match in np.where(y == minY)[0]])
        cv2.circle(frame, (avgX, minY), 50, (0, 255, 0), -1)
        # in_frame = inBounds(avgX, minY)
        # print(f"Hand detected {'in' if in_frame else 'out of'} bounds.")
    # else:
    #     in_frame = False
        # print("Hand not found")

    # if not old_frame_status == in_frame:
    #     print("BOUNDARY")

    img = cv2.drawContours(frame, filtered_contours, -1, (0, 0, 255), 10) if len(filtered_contours) > 0 else frame
    resized_img = cv2.resize(img, (960, 540))
    cv2.rectangle(resized_img, (100, 100), (860, 440), (255, 0, 0), 5)
    cv2.imshow('image',resized_img)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
