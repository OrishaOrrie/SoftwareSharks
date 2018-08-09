from imutils import paths
import argparse
import requests
import cv2
import os

ap = argparse.ArgumentParser()
ap.add_argument("-u", "--urls", required=True, help="path to file containing image URLs")
ap.add_argument("-o", "--output", required=True, help="path to output directory to images")
args = vars(ap.parse_args())

#
# for x in os.listdir(os.getcwd()):
#     img_path = os.getcwd() + "/" + x
#     output_path = ".\downloaded_images\\" + x[:-9] + "\\"
#     if (os.path.isfile(img_path)):
#         rows = open(img_path).read().strip().split("\n")
#         total=0
#
#         for url in rows:
#             try:
#                 r = requests.get(url, timeout=60)
#
#                 p = os.path.sep.join([output_path, "{}.jpg".format(str(total).zfill(8))])
#                 f = open(p, "wb")
#                 f.write(r.content)
#                 f.close()
#
#                 print("[INFO] downloaded: {}".format(p))
#                 total += 1
#             except:
#                 print("[INFO] error downloading {}...skipping".format(p))
#
#         for imagePath in paths.list_images(output_path):
#             delete = False
#
#             try:
#                 image = cv2.imread(imagePath)
#
#                 if image is None:
#                     delete = True
#
#             except:
#                 print("Except")
#                 delete = True
#
#             if delete:
#                 print("[INFO] deleting {}".format(imagePath))
#                 os.remove(imagePath)


rows = open(args["urls"]).read().strip().split("\n")
total=0

for url in rows:
    try:
        r = requests.get(url, timeout=60)

        p = os.path.sep.join([args["output"], "{}.jpg".format(str(total).zfill(8))])
        f = open(p, "wb")
        f.write(r.content)
        f.close()

        print("[INFO] downloaded: {}".format(p))
        total += 1
    except:
        print("[INFO] error downloading {}...skipping".format(p))

for imagePath in paths.list_images(args["output"]):
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
        os.remove(imagePath)
