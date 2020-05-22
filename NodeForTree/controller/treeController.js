const CpuDetails=require('../service/FolderDetails')

class treeController{ 
    constructor(){
        this. details=new CpuDetails();
    }
 
getDetails= (req, res) => {

   this.details. getDirr("A")
    .then(out=>res.json(out))
    .catch(err=>res.json(err))


}

}
module.exports=treeController;