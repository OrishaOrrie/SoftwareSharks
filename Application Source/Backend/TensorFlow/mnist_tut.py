# A guide to TF layers: Building a Convolutional Neural Network:
# https://www.tensorflow.org/tutorials/layers

# Getting Started
from __future__ import absolute_import, division, print_function

import numpy as np

import tensorflow as tf

tf.logging.set_verbosity(tf.logging.INFO)

# INTRO TO CONVOLUTIONAL NEURAL NETWORKS

# CNNs are used a lot recently for image classification.
# - CNNs apply a series of filters to the raw pixel data of an image to extract
#   and learn high-level features, which the model can then use for
#   classification.

# - CNNs contain three components:
# -- Convolutional layers: apply a specified number of convolutional FILTERS
#   to the image. The layer performs maths stuff to each subregion to produce
#   a single value in the output feature map. Convolutional layers then usually
#   apply a ReLU activation function to the ouput.
# -- Pooling layers: which downsample the image data (decrease the number of 
#   inputs). Max pooling is an example pooling algorithm which extracts the max
#   values of 2x2 pixel tiles, and discards the other values.
# -- Dense (fully connected layers): perform classification on the features
#   extracted by the convolutional layers and downsampled by the pooling layers.
#   Every node is connected to every node in the preceding layer.

# - Typically, a CNN is composed of a stack of convolutional modules that perform
#   feature extraction. Each module consists of 1 conv layer and 1 pooling layer.
# - The last conv module is followed by one or more dense layers that perform
#   classification.
# - The final dense layer in a CNN contains a single node for each target class
#   in the model, with a softmax activation function to generate a value between
#   0-1 for each node. These values are the probabilities that the image falls
#   into that class.

# BUILDING THE CNN MNIST CLASSIFIER

# In this model for MNIST classification, we will use the following CNN 
# architecture:
# 1. Conv. layer #1: Applies 32 5x5 filters with ReLU activation function
# 2. Pooling layer #1: Performs max pooling with a 2x2 filter
# 3. Conv. layer #2: Applies 64 5x5 filters with ReLU activation function
# 4. Pooling layer #2: Same as #2.
# 5. Dense layer #1: 1024 neurons.
# 6. Dense layer #2: 10 neurons, one for each classifier (0-9)

# The tf.layers module contains methods to create each of the 3 layers:
# - conv2d():  A two-dim conv. layer. Takes number of filters, filter kernel
#  size, padding, and activation function as arguments.
# - max_pooling2d(): Constructs a 2D pooling layer using the max-pooling algo.
# - dense(): Constructs a dense layer. Takes number of neurons and activation
#  function as arguments.
# Each of these methods accept a tensor as input and returns a transformed 
# tensor as output.

def cnn_model_fn(features, labels, mode):
    # mode is an argument that can either be TRAIN, EVAL, or PREDICT
    """"Model function for CNN."""
    input_layer = tf.reshape(features["x"], [-1, 28, 1])
    # For 2d image data, the layers expect input tensors in the following shape:
    # [batch_size, image_width, image_height, channels]
    # - batch_size: size of the subset of examples used when training
    # - image_width, image_height: cmon brother
    # - channels: number of color channels. for example, monochromatic pics
    #    have 1 channel (black), colour pics have 3 channels (RGB)
    # The tf.reshape converts our input feature map to this shape.
    # - A -1 for batch size specifies that the dimension should be dynamically
    #    computed based on the number of input values in features["x"]. This
    #    makes batch_size a hyperparameter that we can tune. Each element in
    #    feature["x"] is a pixel, so a batch of 5 4x4 values would mean the
    #    feature["x"] array would have 5x4x4 = 80 elements, and the 
    #    input_layer will have a shape of [5,4,4,1].

    #### QUESTION: What size images should we have to process?

    conv1 = tf.layers.conv2d(
        inputs = input_layer,
        filters=32,
        kernel_size=[5,5],
        padding = "same",
        activation = tf.nn.relu)
    # - The inputs arg specifies the input tensor. We always take the tensor of
    # the previous layer. This input must have the shape specfied above. Here
    # - The filters arg specifies the number of filters to apply.
    # - The kernel_size specifies the [width,height] of the filter.
    # - The padding arg specifies one of two enumerated values: valid (default)
    # or same. If you want the output tensor to have the same width and height
    # as the input, you make padding=same, so the width and height is still 28.
    # - The activation arg specifies the activation function.
    # The output tensor in this code is [batch_size, 28, 28, 32].

    pool1 = tf.layers.max_pooling2d(
         inputs=conv1,
         pool_size=[2,2],
         strides = 2)

    # - The pool_size arg specifies the size of the max pooling filter [w, h].
    # - The strides arg specifies the size of the stride. So the subregions that
    # are extracted should be separated by 2 pixels in both directions.
    # The output tensor in this code is [batch_size, 14, 14, 32].

    conv2 = tf.layers.conv2d(
        inputs = pool1,
        filters = 64,
        kernel_size = [5,5],
        padding = "same",
        activation = tf.nn.relu)

    # The output tensor is [batch_size, 14, 14, 64].

    pool2 = tf.layers.max_pooling2d(
        inputs = conv2,
        pool_size=[2,2],
        strides = 2)

    # The output tensor is [batch_size, 7, 7, 64].

    # Dense Layer

    pool2_flat = tf.reshape(pool2, [-1, 7*7*64])
    # Before we connect the dense layer, we have to flattern our feature shape
    # to [batch_size, features].
    # - Again, a -1 indicates a dynamically calculated batch_size.
    # - Each example has 7(width) * 7(height) * 64(channels) features.
    # The pool2_flat tensor is now [batch_size, [7*7*64]].

    dense = tf.layers.dense(inputs=pool2_flat, 
                            units=1024, 
                            activation=tf.nn.relu)
    # - The units arg specifies the number of neurons.

    dropout = tf.layers.dropout(inputs = dense,
                                rate=0.4,
                                training=mode == tf.estimator.ModeKeys.TRAIN)
    # To help improve the results of our model, we apply dropout regularization
    # - The rate arg specifies the dropout rate. 0.4 means 40% of the elements
    # will be randomly dropped out during training.
    # - The training arg takes a boolean specifying whether or not the model is
    # currently being run in training mode. Dropout will only be performed if
    # this value is true.
    # Our output tensor has a shape [batch_size, 1024].

    # Logits Layer
    logits = tf.layers.dense(inputs = dropout,
                             units = 10)
    # The output of the logits layer returns predictions as raw values in the
    # shape of [batch_size, 10] tensor.

    predictions = {
        # Generate Predictions (for PREDICT and EVAL mode)
        "classes" : tf.argmax(inputs=logits, axis=1),
        # Add `softmax_tensor` to the graph. It is used for PREDICT and by the
        # `logging_hook`.
        "probabilities":tf.nn.softmax(logits, name="softmax_tensor")
    }
    # For a given example, our predicted class is the element in the
    # corresponding row of the logits tensor with the highest raw value.
    # -The tf.argmax() function finds this index.
    # -- The axis arg specifies the axis of the input tensor along which to
    # find the largest value along the direction with index of 1.
    # - The softmax() function derives probabilities.
    # The predictions dictionary represents a prediction as a whole. 

    if mode == tf.estimator.ModeKeys.PREDICT:
        return tf.estimator.EstimatorSpec(mode=mode, predictions=predictions)

    # Calculate Loss (for both TRAIN and EVAL modes)
    loss = tf.losses.sparse_softmax_cross_entropy(labels=labels, logits=logits)
    # A loss function measures how closely the model's predictions match the
    # target classes.
    # - The labels tensor contains a list of predictions for our examples. We
    # need to convert this labels tensor to the corresponding one-hot encoding
    # -- The tf.one_hot function does this conversion, like this:
    # --- onehot_labels = tf.one_hot(indices=tf.cast(labels, tf.int32),depth=10)
    # In this section, the input labels tensor must be converted before or
    # during this function.

    # Configure the Training Op (for TRAIN mode)
    if mode == tf.estimator.ModeKeys.TRAIN:
        optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.001)
        train_op = optimizer.minimize(
            loss=loss,
            global_step = tf.train.get_global_step())
        return tf.estimator.EstimatorSpec(
            mode=mode, loss=loss, train_op=train_op)
    # Here, we use a gradient optimizer to reduce the loss value during training   

    # Add evaluation metrics (for EVAL mode)      
    eval_metrics_ops = {
        "accuracy": tf.metrics.accuracy (
            labels = labels, predictions=predictions["classes"]) }
    return tf.estimator.EstimatorSpec(
        mode=mode, loss=loss, eval_metrics_ops=eval_metrics_ops
    )
    # Here, we add an accuracy metric.
    
# TRAINING AND EVALUATING THE CNN MNIST CLASSIFIER

# Load Training and Test Data


print("Loaded")

##
# if __name__ == "__main__":
#    tf.app.run()
##
