import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";


@Component({
  selector: 'navigation-bar-navigation-details',
  templateUrl: './navigation-details.component.html',
  styleUrls: ['./navigation-details.component.css']
})
export class NavigationDetailsComponent implements OnInit {
  static language:string="en";
  load =false;

  loadingDIv(){
    this.load=true;

  }
  readSessionStorage(){
    if(sessionStorage.getItem("loggedin")=='true'){
      return true;
    }else{
      return false;

    }

  }
  

  readPermission(){
    if(sessionStorage.getItem("loggedin")=='true' && sessionStorage.getItem("type")=='admin'){
      return true;
    }else{
      return false;

    }


  }
  LogOut(){
    this.router.navigateByUrl('/');
    sessionStorage.setItem("loggedin",'flase');
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userPassword");
    sessionStorage.removeItem("userTyp");
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');

     
  }

  constructor( public translate: TranslateService,private router: Router) {  
    
      translate.setDefaultLang('en');  
    } 

  ngOnInit() {

    window.addEventListener('LangChangeEvent', (evt:CustomEvent) => {
      console.log("insidetest LangChangeEvent" +NavigationDetailsComponent.language)
      evt.detail.testobj.testFunction( NavigationDetailsComponent.language);
    })
  }
 


changeLang(language: string) { 
  console.log("Change lang clicked")
  window.dispatchEvent(new CustomEvent('languageTranslation', {detail:{ "language": language}}));
  NavigationDetailsComponent.language=language;
  this.translate.use(language);  
  
}  

}
