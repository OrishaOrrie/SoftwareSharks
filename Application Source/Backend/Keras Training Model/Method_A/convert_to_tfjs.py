from keras.preprocessing import image
from keras.models import load_model
import tensorflowjs as tfjs

modelArg = str(sys.argv[1])
print ("Loading model named: " + modelArg)
print("")
model = load_model(modelArg)
print("Model finished loading")
tfjs.converters.save_keras_model(model, ".\\tfjs\\")
print("Model saved to ./tfjs")
