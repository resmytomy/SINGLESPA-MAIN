import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { fileEditorService } from './file-editorservice';
import {fileContent} from './fileContents';

@Component({
  selector: 'app-file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.scss']
})
export class FileEditorComponent {

  constructor(private fileEditorService: fileEditorService,public translate: TranslateService) {}
  contents;
  i:number=0;
 fileContentList :fileContent[]=[]; 
 
  loading: boolean = false;
  errorMessage
  ngOnInit(): void {
    console.log("Start")
    var testobj ={ testFunction: (lang)=>{
      this.translate.use(lang);  
    }}
    window.dispatchEvent(new CustomEvent('LangChangeEvent', {detail:{testobj}}));
    window.addEventListener('languageTranslation', (evt:CustomEvent) => {
      this.translate.use(evt.detail.language);
    
    })
   
    this.getfileContent();
    console.log('this.getfile') 
   }
  public getfileContent() {
    window.dispatchEvent(new CustomEvent('logging-event', {detail:{ "val": ".npmrc file details fetched"}}));

    console.log('inside this')
    this.errorMessage = "";
    this.fileEditorService.getfileContent()
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received'+response)
        
          console.log(response);
          this.formatContent(response);
          this.contents=[{content:response}]
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
        )
  }

  public formatContent(responses){
    var array =[];
    var keyValue=[];
    this.fileContentList=[];
  
    array=responses.split(/\r?\n/);

    for (var value of array) {
       keyValue=value.split("=");
       console.log(keyValue.length)
       if(keyValue.length==2){
      const  content:fileContent={index : this.i,name :keyValue[0],
       value:keyValue[1]
      };
       this.fileContentList.push(content);
        this. i=this.i+1;
    }
    }
    

  }
 
  editField: string;
 

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    event.target.textContent=editField;
    this.fileContentList[id][property] = editField;
    console.log('updatted list');
   console.log(this.fileContentList);
   this.editField='';
  }

  updateAll() {
    console.log('inside update')
    window.dispatchEvent(new CustomEvent('logging-event', {detail:{ "val": ".npmrc file details updated"}}));

    this.fileEditorService.updateFileContents(this.fileContentList)
    .subscribe(
      (response) => {                          
        console.log('response received'+response)
      
        console.log(response);
        window.alert("Updated Sucessfully");
        this.formatContent(response);
       
      },
      (error) => {                
        console.error('Request failed with error')
        this.errorMessage = error;
        this.loading = false;
      },
      )
  }

  add() {
    
    console.log(this.fileContentList)
    const  content:fileContent={index : this.i,name :'',
      value:''
     };
      this.fileContentList.push(content);
       this. i=this.i+1;
  }

 
}
