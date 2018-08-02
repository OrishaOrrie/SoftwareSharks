import os, shutil, json, math
from os.path import isfile, join

TRAINING_DIR = "./training_data"
VALIDATION_DIR = "./validation_data"
ALL_DIR = "./all_images"

def createFolder(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print('Error: Creating Directory. ' + directory)

def createClassesJSON(directory):
    classes = {}
    classes['classes'] = []
    i = 0
    for x in os.listdir(directory):
        classes['classes'].append({
            'id': i,
            'name': x,
            'first': x[0]
        })
        i += 1

        with open('classes.json','w') as outfile:
            json.dump(classes, outfile, indent=4)

def createCategoryFolders(directory):
    json_filename = open("classes.json", "r")
    json_classes = json.loads( json_filename.read() )
    for x in json_classes['classes']:
        category_path = directory + '/' + x['name']
        if not os.path.exists(category_path):
            os.makedirs(category_path)
        # if not os.path.exists(directory + '/' + x['name']):
            # os.makedirs(directory + '/' + x['name'])

def copyImages(directory):
    json_filename = open("classes.json", "r")
    json_classes = json.loads( json_filename.read() )
    for x in json_classes['classes']:
        category_path = directory + '/' + x['name']
        print(category_path)
        if os.path.exists(category_path):
            files = [file for file in os.listdir(category_path) if isfile(join(category_path, file))]
            numFiles = len(files)
            numTrain = math.floor(0.75 * len(files))
            numVal = math.ceil( 0.25 * len(files) )
            count = 0
            while (count < numTrain):
                shutil.copy(category_path + '/' + files[count], TRAINING_DIR + '/' + x['name'])
                count += 1
            while (count < numFiles):
                shutil.copy(category_path + '/' + files[count], VALIDATION_DIR + '/' + x['name'])
                count += 1

createFolder(TRAINING_DIR)
createFolder(VALIDATION_DIR)
createClassesJSON(ALL_DIR)
createCategoryFolders(TRAINING_DIR)
createCategoryFolders(VALIDATION_DIR)
copyImages(ALL_DIR)

# PROCESS
#   1. Create Training and Validation Folders
#   2. Access All data folders
#   3. Create a JSON file with all the categories in All Data
#   4. Create Category Folders
#   5. For each folder in all data folders:
#       5.1 Copy 75% of the images and paste them into the respective training folder
#       5.2 Copy 25% of the images and paste them into the respective validation folder
