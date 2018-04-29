@echo off
echo Running dependency check (cmd)
echo ##################################

::tested with node -v 9.3.0
echo Running npm install on Backend
cd Backend
start /b /wait cmd /c npm install

::tested with npm -v 5.5.1
echo Running npm install on WebApp
cd ../ss-imagerec-webapp/
start /b /wait cmd /c npm install

echo ##################################
echo End of script
pause

