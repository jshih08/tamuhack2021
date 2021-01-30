import numpy as np
import matplotlib.pyplot as plt
import cv2

cap = cv2.VideoCapture(0)

while(True):
    ret, frame = cap.read()
    print(np.shape(frame))

    Z = frame.reshape((-1,3))
    Z = np.float32(Z)

    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
    K = 2
    ret,label,center=cv2.kmeans(Z,K,None,criteria,10,cv2.KMEANS_RANDOM_CENTERS)

    center = np.uint8(center)
    res = center[label.flatten()]
    res2 = res.reshape((frame.shape))
    # cv2.imshow('img', res2)

    img_gray = cv2.cvtColor(res2, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(img_gray, (5, 5), cv2.BORDER_DEFAULT)
    ret, im = cv2.threshold(img_gray, 140, 255, cv2.THRESH_BINARY_INV)
    contours, hierarchy = cv2.findContours(im, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    print([cv2.contourArea(contour) for contour in filter(lambda contour: cv2.contourArea(contour) > 2000, contours)])
    # filtered_contours = list(filter(lambda contour: contour, contours))
    # cv2.contourArea(contour) > 2000  and cv2.contourArea(contour) < 20000
    # print(len(filtered_contours))

    # print(np.shape(filtered_contours))
    # print(filtered_contours)
    # appears  that finger is about 80000 area

    img = cv2.drawContours(frame, contours, -1, (0,255,0), 2)
    cv2.imshow('image',img)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
