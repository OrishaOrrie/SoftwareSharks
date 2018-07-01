import sys
import argparse
import numpy as np
from PIL import Image
import requests
from io import BytesIO
import matplotlib.pyplot as plt

from keras.preprocessing import image
from keras.models import load_model
from keras.applications.inception_v3 import preprocess_input


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
	print("predicting")
	if img.size != target_size:
		img = img.resize(target_size)

	print("resized image")
	x = image.img_to_array(img)
	print("converted image to array")
	x = np.expand_dims(x, axis=0)
	print("did numpy stuff")
	x = preprocess_input(x)
	print("preprocessed array")
	preds = model.predict(x)
	print("made prediction")
	return preds[0]


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
	imageArg = str(sys.argv[1])
	modelArg = str(sys.argv[2])

	print ("image-path: " +  imageArg + "\nmodel-name: " + modelArg)
	
	####################

	# if args.image is None and args.image_url is None:
	#	a.print_help()
	#	sys.exit(1)

	#model = load_model(args.model)
	print("==================")
	print("Loading Model...")
	model = load_model(modelArg)
	print("Loaded Model...")
	
	if imageArg is not None:
		print("Opening image")	
		img = Image.open(imageArg)
		print("Image Opened")
		preds = predict(model, img, target_size)
		print("Completed predict function")
		print(preds)
		plot_preds(img, preds)

	sys.stdout.flush()

	#if args.image is not None:
	#	img = Image.open(args.image)
	#	preds = predict(model, img, target_size)
	#	plot_preds(img, preds)

	#if args.image_url is not None:
	#	response = requests.get(args.image_url)
	#	img = Image.open(BytesIO(response.content))
	#	preds = predict(model, img, target_size)
	#	plot_preds(img, preds)
