const CommandProcessingService = require('../service/terminalService');

class TerminalController {
    constructor() {
        this.cmdExc = new CommandProcessingService();
    }
    executeCommandCotroller(req, res) {

        this.cmdExc.getResult(req)
            .then(data => res.json(data))
            .catch(err => res.json(err));

    }

}
module.exports = TerminalController;