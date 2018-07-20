# ![alt text](https://i.imgur.com/h2hLhqK.png "Software Sharks")

## Ninshiki Image Classification Program

___

### Create a new image prediction model
To create a new model that can be used to make predictions on previously unseen images, the fine-tune.py program is used. To run the program, follow these instructions:

##### Setup:
First, create two folders called "train_dir" and "val_dir". In each of these folders, add the images that you would like to train the model on. Ensure that the images are placed in folders that are named by the category of the image in the respective folder.
Also ensure that the train_dir and val_dir have the same folder names, i.e. that the same categories of images are used. The images should be split so that the train_dir has 70% of the total images while the val_dir 
has 30%.

##### Running the training program:
To train the model from the images in the specified folders, run the fine-tune.py file with the addition of arguments:
-- train_dir <path to train_dir>
-- val_dir <path to val_dir>
-- nb_epoch <number of epochs (training cycles) to run>
-- output_model_file <name of the model file>
E.g. python fine-tune.py --train_dir '.\train_dir\' --val_dir '.\val-dir\' --nb_epoch 3 --output_model_file 'inception-v3-ft.model'

Once the program has completed execution, a MODEL file should exist in the current directory.

### Predict the category of an image
Class prediction is done using the predict.py program. The program is run with the first argument being the path of the image to be predicted, and the second argument being the model from which to predict.
E.g. python predict.py '.\img_12.jpg' '.\inception-v3-ft.model'

Running this program will result in a list of predicted classes with corresponding probabilities to be output in the terminal.
