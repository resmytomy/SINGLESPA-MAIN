var prompt = require("prompt");
const { exec, spawn } = require('child_process');
prompt.start();

function startProjects(){

prompt.get({
  properties: {
    
    login: {
      description: ("Do you want to start  login  app ? Y/N")
    },
    add: {
      description: ("Do you want to start  Add user app? Y/N")
    }, 
    logger: {
      description: ("Do you want to start  Logger  app ?Y/N")
    }, 
    cmdAngular: {
      description: ("Do you want to start  cmd app ? Y/N")
    },  
    cmd: {
      description: ("Do you want to start  node cmd app Y/N")
    },
      treeAngular: {
      description: ("Do you want to start Angular tree app ? Y/N")
    },
    tree: {
      description: ("Do you want to start node tree app ? Y/N")
    },
    cpuAngular: {
      description: ("Do you want to start Angular  cpu details app? Y/N ")
    },
    cpu: {
      description: ("Do you want to start node cpu details app? Y/N ")
    },
    hwAngular: {
      description: ("Do you want to start ANgular  hw  details app ? Y/N ")
    },
    hw: {
      description: ("Do you want to start node  hw  details app ? Y/N ")
    },
    fileAngular: {
      description: ("Do you want to start Angular file edit  app ? Y/N ")
    },    
   
    file: {
      description: ("Do you want to start  node file edit  app ? Y/N ")
    },
   
  }
}, function (err, result) {
    
  exec('Angular-navBar.bat', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
  exec('SingleSPA.bat', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });

  if((result.cmdAngular).toUpperCase()=='Y'){


    exec('Angular-cmd.bat', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  
  }
  if((result.treeAngular).toUpperCase()=='Y'){

    exec('Angular-tree.bat', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  }
    if((result.cpuAngular).toUpperCase()=='Y'){

      exec('Angular-cpu.bat', (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(stdout);
      });
  }
  if((result.hwAngular).toUpperCase()=='Y'){

    exec('Angular-hw.bat', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  
  }

  if((result.fileAngular).toUpperCase()=='Y'){

    exec('Angular-fileedit.bat', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  
  }
  if((result.logger).toUpperCase()=='Y'){

    exec('Angular-logs.bat', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  
  }
  if((result.login).toUpperCase()=='Y'){

    exec('Angular-login.bat', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  
  }
  if((result.add).toUpperCase()=='Y'){

    exec('Angular-addUser.bat', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  
  }
    
  exec('start-jwt.bat', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });

  if((result.cmd).toUpperCase()=='Y'){


    exec('start-cmd.bat', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  
  }
  if((result.tree).toUpperCase()=='Y'){

    exec('start-tree.bat', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  }
    if((result.cpu).toUpperCase()=='Y'){

      exec('start-cpu.bat', (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(stdout);
      });
  }
  if((result.hw).toUpperCase()=='Y'){

    exec('start-hw.bat', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  
  }

  if((result.file).toUpperCase()=='Y'){

    exec('start-fileedit.bat', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  
  }




})


}

startProjects();
