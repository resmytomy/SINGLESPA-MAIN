import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { cpuContent } from './cpuContents';
import {cpuDataService} from './cpuDataService';
@Component({
  selector: 'my-app-hardware-details',
  templateUrl: './hardware-details.component.html',
  styleUrls: ['./hardware-details.component.scss']
})
export class HardwareDetailsComponent implements OnInit {
   language;
  constructor(private cpuDataService: cpuDataService,public translate: TranslateService) {
     
  }
  batteryInfo;
  cpuInfo;
  batteryDetails:cpuContent[]=[]; 
 cpuContentList :cpuContent[]=[]; 
 
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
   
    // window.addEventListener('languageTranslation', (evt:CustomEvent) => {
    //   console.log("Language tr")
    //   var language = evt.detail.language;
    //   this.translate.use(language);  
    // })



    if (localStorage.getItem('locale')) {  
      // const browserLang = localStorage.getItem('locale');  
      // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');  
    } else {  
     this. translate.setDefaultLang('en');  
    }
    this.getcpuDetails();
   }
  public getcpuDetails() {

 window.dispatchEvent(new CustomEvent('logging-event', {detail:{ "val": "CPU details From CPU COmponent"}}));

    console.log('inside this')
    this.errorMessage = "";
    this.cpuDataService.getCpuDetails()
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received'+response)
        
          console.log(response);
          this.cpuInfo=response.cpu;
          this.batteryInfo=response.battery;
          this.formatContent();
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
        )
  }

  public formatContent(){

    for (let key in this.cpuInfo) {
      const  content:cpuContent={name :key,
        value:this.cpuInfo[key]}
        this.cpuContentList.push(content);
  }
  
  for (let key in this.batteryInfo) {
    const  content:cpuContent={name :key,
      value:this.batteryInfo[key]}
      this.batteryDetails.push(content);
}
  
}


}
