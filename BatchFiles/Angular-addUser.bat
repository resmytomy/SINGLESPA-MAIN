start /min cmd /c  "cd .. && cd AddUserApp &&  IF EXIST node_modules (npm start ) ELSE ( npm install && npm start)"



