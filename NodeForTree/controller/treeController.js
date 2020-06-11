const folderDetailsObj=require('../service/FolderDetails')

class treeController{     
 
getDetails= (req, res) => {
   
    folderDetailsObj. getDirr("A")
    .then(out=>res.json(out))
    .catch(err=>res.json(err))

}

}
module.exports=treeController;