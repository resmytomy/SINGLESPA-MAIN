  start /min cmd /c  "cd .. && cd NodeForHardware &&  IF EXIST node_modules (node server.js) ELSE ( npm install && node server.js)"
