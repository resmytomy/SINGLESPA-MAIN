 start /min cmd /c  "cd .. && cd NodeForCpuDetails &&  IF EXIST node_modules (node server.js) ELSE ( npm install && node server.js)"


