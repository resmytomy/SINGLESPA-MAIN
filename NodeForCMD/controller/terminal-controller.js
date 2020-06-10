const newObject = require('../service/terminalService');
class TerminalController {
    constructor() {
    }
    executeCommandCotroller(req, res) {

        newObject.getResult(req)
            .then(data => res.json(data))
            .catch(err => res.json(err));

    }

}
module.exports = TerminalController;