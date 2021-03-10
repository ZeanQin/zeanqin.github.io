call npm install
call npm run build

call cd %DEPLOYMENT_TARGET%
for /F "delims=" %%i in ('dir /b') do (rmdir "%%i" /s/q || del "%%i" /s/q)

xcopy /d %DEPLOYMENT_SOURCE%\.nuxt\* %DEPLOYMENT_TARGET%\.nuxt /s /i
xcopy /d %DEPLOYMENT_SOURCE%\server\* %DEPLOYMENT_TARGET%\server /s /i
xcopy /d %DEPLOYMENT_SOURCE%\static\* %DEPLOYMENT_TARGET%\static /s /i
xcopy /d %DEPLOYMENT_SOURCE%\.npmrc %DEPLOYMENT_TARGET%\.npmrc*
xcopy /d %DEPLOYMENT_SOURCE%\nuxt.config.js %DEPLOYMENT_TARGET%\nuxt.config.js*
xcopy /d %DEPLOYMENT_SOURCE%\package.json %DEPLOYMENT_TARGET%\package.json*
xcopy /d %DEPLOYMENT_SOURCE%\web.config %DEPLOYMENT_TARGET%\web.config*

call npm install
echo Deployed.

call curl -i -X POST -H "Content-Type: application/json" -d "{\"text\": \"Riberry has been Deployed!\"}" "https://chat.googleapis.com/v1/spaces/AAAATDXoZ9s/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=KEWkBC7bd8UqaPwrBlNUfNfdtVegYY0I9lGbQVXRNR0%3D"
