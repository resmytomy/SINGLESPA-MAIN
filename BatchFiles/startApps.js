
const prompt = require("prompt");
const { exec, spawn } = require("child_process");
const { setTimeout } = require("timers");
const { time } = require("console");

var startEntireApplication = {
  properties: {
    entire: {
      description: "Start Entire Application Y/N",
      pattern: /^[nNyY\-]+$/,
      message: "Select only n or y",
      required: true,
    },
  },
};

var stopEntireApplication = {
  properties: {
    stop: {
      description: "Stop Entire Application Y/N",
      pattern: /^[nNyY\-]+$/,
      message: "Select only n or y",
      required: true,
    },
  },
};
var individualApplication = {
  properties: {
    login: {
      description: "Start Login Application Y/N",
      pattern: /^[nNyY\-]+$/,
      message: "Select only n or y",
      required: true,
    },
    hardwareDetails: {
      description: "Start Hardware Details Application Y/N",
      pattern: /^[nNyY\-]+$/,
      message: "Select only n or y",
      required: true,
    },
    cpu: {
      description: "Start CPU Details Application Y/N",
      pattern: /^[nNyY\-]+$/,
      message: "Select only n or y",
      required: true,
    },
    tree: {
      description: "Start tree Details Application Y/N",
      pattern: /^[nNyY\-]+$/,
      message: "Select only n or y",
      required: true,
    },
    file: {
      description: "Start file edit  Application Y/N",
      pattern: /^[nNyY\-]+$/,
      message: "Select only n or y",
      required: true,
    },
    logger: {
      description: "Start  logger Application Y/N",
      pattern: /^[nNyY\-]+$/,
      message: "Select only n or y",
      required: true,
    },
    cmd: {
      description: "Start  command prompt Application Y/N",
      pattern: /^[nNyY\-]+$/,
      message: "Select only n or y",
      required: true,
    },
    addUser: {
      description: "Start  adduser Application Y/N",
      pattern: /^[nNyY\-]+$/,
      message: "Select only n or y",
      required: true,
    },
  },
};


prompt.start();

prompt.get(startEntireApplication, function (err, result) {
  if (err) {
    return onErr(err);
  }
  if ((result.entire).toUpperCase() == 'Y') {
    runSingleSPA();
    jwtMiddleware();
    runNavBar();
    runLoginApp();
    runAdduser();
    runFileEditAppAngular();
    runFileEditNode();
    runCpuAngular();
    runCpuNode();
    runHwAngularApp();
    runHwApp();
    runTree();
    runTreeNode();
    runCMDAngularApp();
    runCMDNodeApp();
    runLoggerApp();
    setTimeout(stop, 120000);


  } else {
    prompt.get(individualApplication, function (err, result) {
      if (err) {
        return onErr(err);
      }
      jwtMiddleware();
      runSingleSPA();
      runNavBar();
      if ((result.cmd).toUpperCase() == 'Y') {
        runCMDAngularApp();
        runCMDNodeApp();

      }
      if ((result.login).toUpperCase() == 'Y') {
        runLoginApp();
      }
      if ((result.cpu).toUpperCase() == 'Y') {
        runCpuNode();
        runCpuAngular();
      }
      if ((result.hardwareDetails).toUpperCase() == 'Y') {
        runHwAngularApp();
        runHwApp();
      }
      if ((result.file).toUpperCase() == 'Y') {
        runFileEditAppAngular();
        runFileEditNode();

      }
      if ((result.addUser).toUpperCase() == 'Y') {
        runAdduser();

      }
      if ((result.logger).toUpperCase() == 'Y') {
        runLoggerApp();

      }
      if ((result.login).toUpperCase() == 'Y') {
        runLoginApp();

      }
      if ((result.tree).toUpperCase() == 'Y') {
        runTreeNode();
        runTree();

      }

      setTimeout(stop, 120000);

      
    });
  }
});

function stop(){
  prompt.get(stopEntireApplication, function (err, result) {
    if (err) {
      return onErr(err);
    }
    if ((result.stop).toUpperCase() == 'Y') {
      console.log("application is going to stop")
      // prompt.exit();
      // process.exit(0);
      exec("exit", (err, stdout, stderr) => {
        if (err) {
          console.error(stderr.err);
          return;
        }
        console.log(stdout);
      });
    }

   });
}

function runAdduser() {
  console.log("Staring add user application")
  exec("cd .. && cd AddUserApp && IF EXIST node_modules (npm start) ELSE ( npm install && npm start) ", (err, stdout, stderr) => {
    if (err) {
      console.error(stderr.err);
      return;
    }
    console.log(stdout);
  });
}

function runLoginApp() {
  console.log("Staring Login application")

  exec("cd .. && cd LoginApp && IF EXIST node_modules (npm start) ELSE ( npm install && npm start) ", (err, stdout, stderr) => {
    if (err) {
      console.error(stderr.err);
      return;
    }
    console.log(stdout);
  });
}

function jwtMiddleware() {
  console.log("Staring middleware application")

  exec("cd .. && cd JWTMiddleware && IF EXIST node_modules (npm start) ELSE ( npm install && npm start) ", (err, stdout, stderr) => {
    if (err) {
      console.error(stderr.err);
      return;
    }
    console.log(stdout);
  });
}

function runNavBar() {
  console.log("Staring navbar application")

  exec("cd .. && cd NavigationBar && IF EXIST node_modules (npm start) ELSE ( npm install && npm start) ", (err, stdout, stderr) => {
    if (err) {
      console.error(stderr.err);
      return;
    }
    console.log(stdout);
  });
}
function runSingleSPA() {
  console.log("Staring main application")
  exec("cd .. && cd SingleSPARoot && IF EXIST node_modules (npm start) ELSE ( npm install && npm start) ", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}
function runCMDAngularApp() {

  console.log("Staring cmd angular application")

  exec("cd .. && cd AngularAppForCMD && IF EXIST node_modules (npm start) ELSE ( npm install && npm start) ", (err, stdout, stderr) => {
    if (err) {
      console.log(err);

      return;
    }
    console.log(stdout);

  });

}
function runCMDNodeApp() {
  console.log("Staring cmd node application")

  exec("cd .. && cd NodeForCMD && IF EXIST node_modules (npm start) ELSE ( npm install && npm start) ", (err, stdout, stderr) => {
    if (err) {
      //console.error(err);
      console.log(err);
      return;
    }
    console.log(stdout);
  });
}

function runCpuAngular() {
  console.log("Staring cpu angular application")

  exec("cd .. && cd AngularAppForCPU && IF EXIST node_modules (npm start) ELSE ( npm install && npm start) ", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}
function runCpuNode() {
  console.log("Staring cpu node application")

  exec("cd .. && cd NodeForCpuDetails && IF EXIST node_modules (npm start) ELSE ( npm install && npm start) ", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}
function runHwAngularApp() {
  console.log("Staring hw details angular application")

  exec("cd .. && cd AngularAppForHardware && IF EXIST node_modules (npm start) ELSE ( npm install && npm start) ", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });

}
function runHwApp() {

  console.log("Staring hw details node application")

  exec("cd .. && cd NodeForHardware && IF EXIST node_modules (npm start) ELSE ( npm install && npm start) ", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}
function runTree() {
  console.log("Staring tree details angular application")

  exec("cd .. && cd AngularAppForTree && IF EXIST node_modules (npm start) ELSE ( npm install && npm start) ", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}
function runTreeNode() {
  console.log("Staring tree details node  application")

  exec("cd .. && cd NodeForTree && IF EXIST node_modules (npm start) ELSE ( npm install && npm start) ", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });

}
function runLoggerApp() {
  console.log("Staring logger  application")

  exec("cd .. && cd LoggerApp && IF EXIST node_modules (npm start) ELSE ( npm install && npm start) ", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });

}

function runFileEditAppAngular() {
  console.log("Staring file details angular application")

  exec("cd .. && cd AngularAppForFileEdit && IF EXIST node_modules (npm start) ELSE ( npm install && npm start) ", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });

}
function runFileEditNode() {
  console.log("Staring file deatils node application")

  exec("cd .. && cd NodeForFileEdit && IF EXIST node_modules (npm start) ELSE ( npm install && npm start) ", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });

}