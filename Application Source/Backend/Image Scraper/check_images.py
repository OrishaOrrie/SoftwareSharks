from imutils import paths
import sys
import requests
import cv2
import os

arg1 = sys.argv[1]

for imagePath in paths.list_images(arg1):
    delete = False

    try:
        image = cv2.imread(imagePath)

        if image is None:
            delete = True

    except:
        print("Except")
        delete = True

    if delete:
        print("[INFO] deleting {}".format(imagePath))
        sys.stdout.flush()
        os.remove(imagePath)
