set /p ModelInputPath=Please enter the location of model file: 
set /p ModelOutputPath=Please enter the location to store model file: 

tensorflowjs_converter --input_format keras --output_format tensorflowjs "%ModelInputPath%" "%ModelOutputPath%\tfjs"
move "%ModelOutputPath%\tfjs\model.json" "%ModelOutputPath%"
pause