import os
import sys
import argparse
import numpy as np
from PIL import Image
import requests
from io import BytesIO
import json
from pathlib import Path

from keras.preprocessing import image
from keras.models import load_model
from keras.applications.inception_v3 import preprocess_input, decode_predictions

target_size=(229,229) # fixed size for InceptionV3 architecture

def test_images(directory):
    print("\nBeginning Image Testing")
    i = 0
    for x in os.listdir(directory):
        print(i)
        image_name = directory + "/" + x
        print("Predicting " + image_name)
        img = Image.open(image_name)
        predict(model, img, target_size)
        print("")
        i += 1

def predict(model,img,target_size):
	"""
	Run model prediction on image
	Args:
		model: keras model
		img: PIL format image
		target_size: (w,h) tuple
	Returns:
		list of predicted labels and their probabilities
	"""
	# print("resizing image")
	if img.size != target_size:
		img = img.resize(target_size)

	# print("converting image to array")
	x = image.img_to_array(img)
	# print("shaping array for preprocessing")
	x = np.expand_dims(x, axis=0)
	# print("preprocessing input for inception v3")
	x = preprocess_input(x)
	# print("making a prediction")
	preds = model.predict(x)
	top_preds = np.argsort(-preds)[::-1][0:8]

	print("adding labels to prediction")
	classes = list()
	json_filename = open("classes.json", "r")
	json_classes = json.loads( json_filename.read() )
	for x in json_classes['classes']:
		classes.append(x['name'])

	results = list()

	print("")
	#print("Predictions: ")
	for i in range(0, 8):
		n = top_preds[0][i]
		results.append((classes[n], preds[0][n]))
		print("Class: {} Likeliness: {}".format(results[i][0], results[i][1]))

	return preds


modelArg = str(sys.argv[1])
print ("Loading model named: " + modelArg)
print("")
model = load_model(modelArg)
print("Model finished loading")
test_images("./test_images")
