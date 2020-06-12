import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { cpuContent } from './cpuContents';
import { CpuDetailsService } from '../service/cpu-details.service';
@Component({
  selector: 'cpu-details',
  templateUrl: './cpu-details.component.html',
  styleUrls: ['./cpu-details.component.scss']
})
export class CpuDetailsComponent implements OnInit {
  language;
  constructor(private cpuDataService: CpuDetailsService, public translate: TranslateService) {

  }
  batteryInfo;
  cpuInfo;
  batteryDetails: cpuContent[] = [];
  cpuContentList: cpuContent[] = [];

  loading: boolean = false;
  errorMessage
  ngOnInit(): void {
    console.log("Start")
    this.eventsCreation();
    this.getcpuDetails();
  }

  eventsCreation() {
    var testobj = {
      testFunction: (lang) => {
        this.translate.use(lang);
      }
    }
    window.dispatchEvent(new CustomEvent('LangChangeEvent', { detail: { testobj } }));
    window.addEventListener('languageTranslation', (evt: CustomEvent) => {
      this.translate.use(evt.detail.language);

    })

  }
  public getcpuDetails() {

    window.dispatchEvent(new CustomEvent('logging-event', { detail: { "val": "CPU details From CPU COmponent" } }));
    this.errorMessage = "";
    this.cpuDataService.getCpuDetails()
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received' + response)

          console.log(response);
          this.cpuInfo = response.cpu;
          this.batteryInfo = response.battery;
          this.formatContent();
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
      )
  }

  public formatContent() {

    for (let key in this.cpuInfo) {
      const content: cpuContent = {
        name: key,
        value: this.cpuInfo[key]
      }
      this.cpuContentList.push(content);
    }

    for (let key in this.batteryInfo) {
      const content: cpuContent = {
        name: key,
        value: this.batteryInfo[key]
      }
      this.batteryDetails.push(content);
    }

  }


}
