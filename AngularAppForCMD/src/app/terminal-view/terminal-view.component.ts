import { Component, OnInit } from '@angular/core';
import { TermnalViewService } from '../service/terminal-view.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-cmd',
  templateUrl: './terminal-view.component.html',
  styleUrls: ['./terminal-view.component.scss']
})
export class TerminalViewComponent {

  constructor(private service: TermnalViewService,public translate: TranslateService) {}
  static previousCommands:string[]=[];
  result:any;
  command:string;
  loading: boolean = false;
  errorMessage
  static language;
  ngOnInit(): void {
    this.eventsCreation();
   }
  eventsCreation() {
    var testobj ={ 
      testFunction: (lang)=>{
       this.translate.use(lang); 
    }

    }
  
  window.dispatchEvent(new CustomEvent('LangChangeEvent', {detail:{testobj}}));
    window.addEventListener('languageTranslation', (evt:CustomEvent) => {
      this.translate.use(evt.detail.language);
    
    })  }
 
  executeCommand(command) {
    window.dispatchEvent(new CustomEvent('logging-event', {detail:{ "val": "COmmand executed"+command}}));

    TerminalViewComponent.previousCommands.push(command);
    console.log('inside update')
    this.service.executeCOmmand(command)
    .subscribe(
      (response) => {                          
        console.log('response received'+response)
      
        console.log(response);
       // window.alert("Updated Sucessfully");
        this.result=response;
       
      },
      (error) => {                
        console.error('Request failed with error')
        this.errorMessage = error;
        this.loading = false;
      },
      )
  }
copy(cmd){
  this.command=cmd;
}
 get prevCommand(){
   return TerminalViewComponent.previousCommands;
 }
}
