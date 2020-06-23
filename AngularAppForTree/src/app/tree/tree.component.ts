import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { TreeNode } from './tree-node';
import {TreeService} from '../service/tree.service'
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  @Input()  treeData: TreeNode[]=[];
  data:any;
  static loadedIntial:string='not';
  loading: boolean = false;
  errorMessage
  constructor(private treeService: TreeService,public translate: TranslateService,private router:Router) {

    console.log(TreeComponent.loadedIntial)
    if(TreeComponent.loadedIntial!='Loaded'){
      this.getHardWareDetails();
      }
  }
  ngOnInit() {
    this.eventsCreation();
   
  }
eventsCreation(){
  var testobj ={ testFunction: (lang)=>{
    this.translate.use(lang);  
  }}
  window.dispatchEvent(new CustomEvent('LangChangeEvent', {detail:{testobj}}));
  window.addEventListener('languageTranslation', (evt:CustomEvent) => {
    this.translate.use(evt.detail.language);
  
  })

}
  toggleChild(node) {
    node.showChildren = !node.showChildren;
  }

  public getHardWareDetails() {
    window.dispatchEvent(new CustomEvent('logging-event', {detail:{ "val": "Folder details fetched"}}));

    console.log('inside this')
    TreeComponent.loadedIntial='Loaded'
    this.errorMessage = "";
    this.treeService.getHardWareDetails()
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received'+response)
        this. data=response;
          console.log(response);
          var t='['+response+']';
          this.treeData.push(response);
          console.log(this.treeData);
          
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
        )
  }
  
  readSessionStorage(){
    if(sessionStorage.getItem("loggedin")=='true'){
      return true;
    }else{
      return false;

    }

  }

  navigate(){
    this.router.navigateByUrl('/')

  }

}
