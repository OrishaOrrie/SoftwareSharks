import sys
import argparse
import numpy as np
from PIL import Image
import requests
from io import BytesIO
import matplotlib.pyplot as plt
import json
from pathlib import Path

from keras.preprocessing import image
from keras.models import load_model
from keras.applications.inception_v3 import preprocess_input, decode_predictions

target_size=(229,229) # fixed size for InceptionV3 architecture

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
	print("resizing image")
	if img.size != target_size:
		img = img.resize(target_size)

	print("converting image to array")
	x = image.img_to_array(img)
	print("shaping array for preprocessing")
	x = np.expand_dims(x, axis=0)
	print("preprocessing input for inception v3")
	x = preprocess_input(x)
	print("making a prediction")
	preds = model.predict(x)
	top_preds = np.argsort(-preds)[::-1][0:8]

	print("adding labels to prediction")
	classes = list()
	json_filename = open("classes.json", "r")
	json_classes = json.loads( json_filename.read() )
	for x in json_classes['classes']:
		classes.append(x['name'])

	# with open("categories.txt") as cat_file:
		# for line in cat_file:
			# line = line.strip().split(' ')
			# classes.append(line[0][3:])

	results = list()

	print("")
	#print("Predictions: ")
	for i in range(0, 8):
		n = top_preds[0][i]
		results.append((classes[n], preds[0][n]))
		#print("Class: {} Likeliness: {}".format(results[i][0], results[i][1]))

	writeToJson(results)
	return preds

def writeToJson(results):
	data = {}
	data['data'] = []
	for i in range(0, 8):
		data['data'].append({
		'id': i,
		'class': results[i][0],
		'value': str(results[i][1])
		})

	with open('predictions.json','w') as outfile:
		json.dump(data, outfile, indent=4)

def plot_preds(image, preds):
	"""
	Displays image and the top-n predicted probabilities in a bar graph
	Args:
		image: PIL image
		preds: list of predicted labels and their probabilities
	"""
	plt.imshow(image)
	plt.axis('off')

	plt.figure()
	# labels = ("AllanKey", "BinzelTorch","CombinationSpanner","TapeMeasure","TowBelt")
	labels = ("CombinationSpanner","TapeMeasure")
	plt.barh([0, 1], preds, alpha=0.5)
	plt.yticks([0, 1], labels)
	plt.xlabel('Probability')
	plt.xlim(0,1.01)
	plt.tight_layout()
	plt.show()


if __name__=="__main__":
	# a = argparse.ArgumentParser()
	# a.add_argument("--image", help="path to image")
	# a.add_argument("--image_url", help="url to image")
	# a.add_argument("--model")
	# args = a.parse_args()

	####################
	if len(sys.argv) < 2:
		imageArg=input("Image: ")
		modelArg = input("Model: ")
	else:
		imageArg=str(sys.argv[2])
		modelArg = str(sys.argv[1])
	# modelArg = str(sys.stdin.readlines())

	print ("model-name: " + modelArg)
	sys.stdout.flush()
	print("")

	####################

	# if args.image is None and args.image_url is None:
	#	a.print_help()
	#	sys.exit(1)

	#model = load_model(args.model)
	print("Loading Model...")
	#sys.stdout.flush()
	model = load_model(modelArg)
	print("Loaded Model...")
	sys.stdout.flush()
	print("NodeJS:model_loaded")
	sys.stdout.flush()
	predicts = predict(model, Image.open(imageArg), target_size)
	# while(imageArg is not None):
	# 	print("NodeJS:image_source: ")
	# 	imageArg=input()
	# 	print ("image-path: " +  imageArg)
	# 	print("")
	# 	my_file = Path(imageArg)
	# 	if imageArg=="quit":
	# 		break;
	# 	elif(imageArg=="restart"):
	# 		print("Reloading Model...")
	# 		model = load_model(modelArg)
	# 		print("Reloaded Model...")
	# 		sys.stdout.flush()
	# 		print("NodeJS:model_reloaded")
	# 		sys.stdout.flush()
	# 	elif my_file.is_file():
	# 		print("Opening image")
	# 		img = Image.open(imageArg)
	# 		print("")
	# 		print("Making a prediction")
	# 		predicts = predict(model, img, target_size)
	# 		sys.stdout.flush()
	# 		print("NodeJS:image_classified")
	# 		sys.stdout.flush()
		# print(predicts)
		# plot_preds(img, predicts)

	# sys.stdout.flush()

	#if args.image is not None:
	#	img = Image.open(args.image)
	#	preds = predict(model, img, target_size)
	#	plot_preds(img, preds)

	#if args.image_url is not None:
	#	response = requests.get(args.image_url)
	#	img = Image.open(BytesIO(response.content))
	#	preds = predict(model, img, target_size)
	#	plot_preds(img, preds)
