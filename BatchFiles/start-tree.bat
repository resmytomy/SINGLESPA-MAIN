start /min cmd /c "cd .. && cd NodeForTree &&  IF EXIST node_modules (node server.js) ELSE ( npm install && node server.js)"


