import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'logger-app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {
static logs:string[]=[];
  constructor(private router: Router) { }

  ngOnInit() {

    window.addEventListener('logging-event', (evt:CustomEvent) => {
    
      LoggerComponent.logs.push(new Date()+" :"+ evt.detail.val);
    })
  }
  get staticlogs(){
    return LoggerComponent.logs;
  }
  readSessionStorage(){
    if(sessionStorage.getItem("loggedin")=='true'){
      return true;
    }else{
      return false;

    }

  }
  navigate(){
    this.router.navigateByUrl('http://localhost:4200/')

  }

}
