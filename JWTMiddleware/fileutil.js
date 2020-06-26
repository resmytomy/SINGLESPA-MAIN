const fs = require("fs");

class FileUtil {
  constructor() { }

  write(fileName, req) {

    const loginData = req.body;
  users.push({
    first_name: loginData.firstName,
    last_name: loginData.lastName,
    username: loginData.username,
    password: loginData.password,
    role: loginData.type
  });

  let final = "users =" + JSON.stringify(users) + "\n\r module.exports=users";


    return new Promise((resolve, reject) => {

      fs.writeFile(fileName, final, (err, data) => {

        if (err) {

          reject(err)  // calling `reject` will cause the promise to fail with or without the error passed as an argument

          return        // and we don't want to go any further

        }

        resolve(data)

      })

    })
  }





}
fileUtilObject =new FileUtil();
module.exports = fileUtilObject;

