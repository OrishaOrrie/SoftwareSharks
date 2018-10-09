from imutils import paths
import sys
import requests
import cv2
import os
if len(sys.argv) < 2:
    arg1 = input("Category: ")
else:
    arg1 = sys.argv[1]
arg2=input("Model: ")
formatted_arg = arg1.replace(" ", "_")
arg1 = ".\\"+arg2+"_model\\"+arg2+"_downloaded_images\\" + formatted_arg
print(arg1)

for imagePath in paths.list_images(arg1):
    delete = False

    try:
        image = cv2.imread(imagePath,0)

        if image is None:
            delete = True

    except:
        print("Except")
        delete = True

    if delete:
        print("[INFO] deleting {}".format(imagePath))
        sys.stdout.flush()
        os.remove(imagePath)
    
