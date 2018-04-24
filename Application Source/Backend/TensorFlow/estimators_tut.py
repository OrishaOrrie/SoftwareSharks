# ESTIMATOR TUTORIAL - https://www.tensorflow.org/get_started/premade_estimators

# Estimator API: represents a complete model. The API provides methods to train
# the model, to judge the model's accuracy, and to generate predictions.

# Datasets API: builds a data input pipeline. The API has methods to load and
# manipulate data, and feed it into your model.

# To create a TensorFlow program based on Estimators, you have to complete the 
# following steps:
# 1. Create one or more input functions.
# 2. Define the model's feature columns.
# 3. Instantiate an Estimator, specifying the feature columns and various
# hyperparameters
# 4. Call one or more methods on the Estimator object, passing the appropriate
# input function as the source of the data.

# STEP 1: INPUT FUNCTIONS
# - An input function RETURNS a tf.data.Dataset object.
# - A tf.data.Dataset object is a two-element tuple (features, label) :
# -- features: a Python dictionary (like a JSON object)
# --- Each key is the name of a feature. e.g. SepalLength, Petal Width
# --- Each value is an array of containing all that feature's values.
# -- label: An array containing all of that feature's values (Iris, Rose, Daisy)

# STEP 2: DEFINE THE FEATURE COLUMNS
# A feature column is an object describing how the model should use raw input 
# data from the features dictionary. The Estimator model would receive this
# features column. TensorFlow uses the tf.feature_column.
#  - For example, a feature column would tell the Estimator to take 4 raw numeric
# values and represent them as 32-bit floating-point values.

# STEP 3: INSTANTIATE AN ESTIMATOR
# For classification problems, like the one we have, we use TensorFlow Estimators,
# such as tf.estimator.DNNClassifier. We could instantiate an estimator with 2
# hidden layers and 10 nodes in each layer.

# STEP 4: TRAIN, EVALUATE, AND PREDICT

# TRAIN THE MODEL
# To train the model, we call the classifier's train() function, passing in an
# input function and a number of steps to train before stopping.
# The input function contains the data that is set to be trained.

# EVALUATE THE MODEL
# We use classifier.evaluate() to test how good our model is by passing an
# function with separate test data. Only one step (or epoch) is completed.

# MAKING PREDICTIONS
# We use classifer.predict() with an input function of random samples that we
# thought of to actually predict data.
