class TerminalController{ 
    constructor(){}
    executeCommandCotroller (req, res)  {

const  CommandProcessingService   =require('../service/terminalService');
 const cmdExc=new CommandProcessingService();
    console.log('Indide controller')
    console.log('requsrt is ',
    req)

    cmdExc.getResult(req)
    .then(data =>res.json(data))
    .catch(err => res.json(err));
   
}

}
module.exports=TerminalController;