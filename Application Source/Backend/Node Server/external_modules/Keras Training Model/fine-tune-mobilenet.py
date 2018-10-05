import os
import sys
import glob
import argparse
import matplotlib.pyplot as plt
import numpy as np

from PIL import ImageFile
from keras import __version__
from keras.applications.mobilenet import MobileNet, preprocess_input
from keras.models import Model
from keras.layers import Dense, GlobalAveragePooling2D
from keras.preprocessing.image import ImageDataGenerator, img_to_array
from keras.optimizers import SGD, Adam, Adagrad, Adadelta
from sklearn.utils import class_weight
from tensorflow.python.client import device_lib
# import tensorflowjs as tfjs

IM_WIDTH, IM_HEIGHT=224,224 #fixed size for MobileNet
NB_EPOCHS=10
BAT_SIZE=32
FC_SIZE=1024
NB_MN_LAYERS_TO_FREEZE=10

def get_nb_files(directory):
	"""
	Get number of files by searching directory recursively
	"""
	if not os.path.exists(directory):
		return 0
	cnt=0
	for r,dirs,files in os.walk(directory):
		for dr in dirs:
			cnt+=len(glob.glob(os.path.join(r,dr+"/*")))
	return cnt

def setup_to_transfer_learn(model,base_model):
	"""Freeze all layers and compile model"""
	for layer in base_model.layers:
		layer.trainable=False
	model.compile(optimizer='rmsprop',loss='categorical_crossentropy', metrics=['accuracy'])

def add_new_last_layer(base_model, nb_classes):
	"""
	Add last layer to the convnet
	Args:
		base_model: keras model excluding top
		nb_classes: # of classes
	Returns:
		new keras model with last layer
	"""
	x=base_model.output
	x=GlobalAveragePooling2D()(x)
	x=Dense(FC_SIZE,activation='relu')(x)#new FC layer, random init
	predictions=Dense(nb_classes,activation='softmax')(x)# new softmax layer
	model=Model(inputs=base_model.input, outputs=predictions)
	return model

def setup_to_finetune(model):
	"""
	Freeze bottom NB_IV3_LAYERS and retrain the remaining top layers.

	note: NB_MN_LAYERS correspond to top 2 inception blocks in inceptionv3 arch

	Args:
		model: keras model
	"""
	for layer in model.layers[:NB_MN_LAYERS_TO_FREEZE]:
		layer.trainable=False
	for layer in model.layers[NB_MN_LAYERS_TO_FREEZE:]:
		layer.trainable=True
	model.compile(optimizer=SGD(lr=0.01),loss='categorical_crossentropy',metrics=['accuracy'])

def train(args):
	"""
	Use transfer learning and fine-tuning to train a network on a new dataset
	"""
	nb_train_samples=get_nb_files(args.train_dir)
	nb_classes=len(glob.glob(args.train_dir+"/*"))
	nb_val_samples=get_nb_files(args.val_dir)
	nb_epoch=int(args.nb_epoch)
	batch_size=int(args.batch_size)

	#Data prep
	train_datagen=ImageDataGenerator(
		preprocessing_function=preprocess_input,
		rotation_range=45,
		# width_shift_range=0.2,
		# height_shift_range=0.2,
		# shear_range=0.2,
		zoom_range=0.2,
		horizontal_flip=True,
		# featurewise_std_normalization=True,
		# zca_whitening=True
	)

	test_datagen=ImageDataGenerator(
		preprocessing_function=preprocess_input,
		rotation_range=45,
		# width_shift_range=0.2,
		# height_shift_range=0.2,
		# shear_range=0.2,
		zoom_range=0.2,
		horizontal_flip=True,
		# featurewise_std_normalization=True,
		# zca_whitening=True
	)

	print("generating training data")
	train_generator=train_datagen.flow_from_directory(
		args.train_dir,
		target_size=(IM_WIDTH, IM_HEIGHT),
		batch_size=batch_size,
		# save_to_dir="augmented_images",
		# save_prefix="aug",
		# save_format="png"
	)

	print("generating validation data")
	validation_generator=test_datagen.flow_from_directory(
		args.val_dir,
		target_size=(IM_WIDTH, IM_HEIGHT),
		batch_size=batch_size
	)
	print("")

	#Setup Model
	print("getting MobileNet model without last layer")
	base_model=MobileNet(weights='imagenet',include_top=False)
	#include_top=False excludes final FC layer
	print("")

	print('adding new last layer')
	model=add_new_last_layer(base_model,nb_classes)
	print("")

	#Transfer learning
	print('setting up to transfer learn - freeze all layers and compile model')
	setup_to_transfer_learn(model,base_model)
	print("")

	print("computing history of transfer learning process")
	# class_weights = class_weight.compute_class_weight('balanced', np.unique(train_generator), train_generator)
	history_tl=model.fit_generator(
		train_generator,
		steps_per_epoch=nb_train_samples/batch_size,
		epochs=nb_epoch,
		validation_data=validation_generator,
		validation_steps=nb_val_samples/batch_size,
		class_weight="auto"
	)

	#Fine-tuning
	print('setting up fine tuning - freeze all layers and compile model')
	setup_to_finetune(model)

	print('computing history of fine tuning process')
	history_ft=model.fit_generator(
		train_generator,
		steps_per_epoch=nb_train_samples/batch_size,
		epochs=nb_epoch,
		validation_data=validation_generator,
		validation_steps=nb_val_samples/batch_size,
		class_weight='auto'
	)
	print("")

	print('saving model to file')
	model.save(args.output_model_file)
	model.summary()
	# tfjs.converters.save_keras_model(model, ".\\tfjs\\")

	print('plotting fine tuning process')
	plot_training(history_ft)

def plot_training(history):
	acc=history.history['acc']
	val_acc=history.history['val_acc']
	loss=history.history['loss']
	val_loss=history.history['val_loss']
	epochs=range(len(acc))

	plt.plot(epochs,acc,'r.')
	plt.plot(epochs,val_acc,'r')
	plt.title('Training and validation accuracy')

	plt.figure()
	plt.plot(epochs,loss,'r.')
	plt.plot(epochs,val_loss,'r-')
	plt.title('Training and validation loss')
	plt.show()

if __name__=="__main__":
	a=argparse.ArgumentParser()
	a.add_argument("--train_dir", default="./training_data")
	a.add_argument("--val_dir", default="./validation_data")
	a.add_argument("--nb_epoch",default=NB_EPOCHS)
	a.add_argument("--batch_size",default=BAT_SIZE)
	a.add_argument("--output_model_file",default="mobilenet-tf.h5")
	a.add_argument("--plot",action="store_true")

	ImageFile.LOAD_TRUNCATED_IMAGES = True

	args=a.parse_args()
	if args.train_dir is None or args.val_dir is None:
		a.print_help()
		sys.exit(1)

	if (not os.path.exists(args.train_dir)) or (not os.path.exists(args.val_dir)):
		print("Directories do not exist")
		sys.exit(1)

	print("")
	print(device_lib.list_local_devices())

	print("")
	print("Commencing Initial Training")
	train(args)
