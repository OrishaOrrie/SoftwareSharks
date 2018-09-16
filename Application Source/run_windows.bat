@echo off
echo Running Server (windows)
echo ##################################

::Run Backend Node server in new window
echo Running Backend Node Server
cd Backend/Node Server/
start cmd /k node server.js

::TODO python tensorflow script
echo Tensorflow Python

::Run WebApp
echo Running Angular WebApp
cd ../../ss-imagerec-webapp/
start cmd /k ng serve

