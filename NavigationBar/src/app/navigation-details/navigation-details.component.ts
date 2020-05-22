import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'navigation-bar-navigation-details',
  templateUrl: './navigation-details.component.html',
  styleUrls: ['./navigation-details.component.css']
})
export class NavigationDetailsComponent implements OnInit {
  static language:string="en";

  constructor( public translate: TranslateService) {  
    
      translate.setDefaultLang('en');  
    } 

  ngOnInit() {

    window.addEventListener('LangChangeEvent', (evt:CustomEvent) => {
      console.log("insidetest LangChangeEvent" +NavigationDetailsComponent.language)
      evt.detail.testobj.testFunction( NavigationDetailsComponent.language);
    })
  }
// onClick(){
//   window.dispatchEvent(new CustomEvent('languageTranslation', {detail:{ "language":NavigationDetailsComponent.language}}));

//   console.log("Onclick...")
// }

changeLang(language: string) { 
  console.log("Change lang clicked")
  window.dispatchEvent(new CustomEvent('languageTranslation', {detail:{ "language": language}}));
  NavigationDetailsComponent.language=language;
  this.translate.use(language);  
  
}  
}
