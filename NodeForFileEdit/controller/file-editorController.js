const fileUtilObject = require('../service/fileutil')


class fileEditorController {
    writeFileController(req, res) {

        fileUtilObject.write('npmrc', req)

            .then(data => res.json(data))

            .catch(err => res.json(err))


        //res.send( futil.write('npmrc',req));
    }
    readFileController = (req, res) => {


        fileUtilObject.getFile('npmrc')

            .then(data => res.json(data))

            .catch(err => res.json(err))

    }


}
module.exports = fileEditorController;