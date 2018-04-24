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
# For example, a feature column would tell the Estimator to take 4 raw integer
# values