class TerminalController{ 
    executeCommandCotroller (req, res)  {
    const CommandProcessingService=require('../service/terminalService')
    const cmdExc=new CommandProcessingService();

    console.log('inside write!');
    cmdExc.executeCommand(req,res);



    
}

}
module.exports=TerminalController;