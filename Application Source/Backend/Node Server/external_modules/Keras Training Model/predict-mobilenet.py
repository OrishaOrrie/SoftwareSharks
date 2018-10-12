import os
import sys
import argparse
import numpy as np
from PIL import Image
import requests
from io import BytesIO
import json
import imghdr
from pathlib import Path

from keras.preprocessing import image
from keras.models import load_model, model_from_json
from keras.applications.mobilenet import preprocess_input, decode_predictions, relu6, DepthwiseConv2D
from keras.utils.generic_utils import CustomObjectScope

target_size=(224,224) # fixed size for InceptionV3 architecture

def predict(model,img,target_size,numberOfResults):
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

	# print("adding labels to prediction")
	classes = list()
	json_filename = open('./'+modelName+'_model/'+modelName+'_dataset/'+"classes.json", "r")
	json_classes = json.loads( json_filename.read() )
	for x in json_classes['classes']:
		classes.append(x['name'])

	results = list()

	# print("")
	#print("Predictions: ")
	for i in range(0, numberOfResults):
		n = top_preds[0][i]
		results.append((classes[n], preds[0][n]))
		print("Result{}|{}".format(results[i][0], results[i][1]))

	return preds

# print("Starting predict")
modelName = input("")
modelArg = './'+modelName+'_model/'+modelName+'_dataset/'+modelName+'-mobilenet-tf.h5'
# print(modelArg)

# print ("Loading model named: " + modelArg)

with CustomObjectScope({'relu6':relu6, 'DepthwiseConv2D': DepthwiseConv2D}):
	model = load_model(modelArg)

# json_file = open('./' + modelName + '_model\\' + modelName + '_dataset\\' + modelName + '_model.json',"r")
# loaded_model_json = json_file.read()
# json_file.close()
# model = model_from_json(loaded_model_json)
# model.load_weights(modelArg)

print("Model finished loading")
imageUrl = input("")
# print(imageUrl)

numberOfResults = input("")

response = requests.get(imageUrl)
img = Image.open(BytesIO(response.content))
preds = predict(model, img, target_size,int(numberOfResults))
