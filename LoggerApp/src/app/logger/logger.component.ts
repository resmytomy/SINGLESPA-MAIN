import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'logger-app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {
static logs:string[]=[];
  constructor() { }

  ngOnInit() {

    window.addEventListener('logging-event', (evt:CustomEvent) => {
    
      LoggerComponent.logs.push(new Date()+" :"+ evt.detail.val);
    })
  }
  get staticlogs(){
    return LoggerComponent.logs;
  }

}
