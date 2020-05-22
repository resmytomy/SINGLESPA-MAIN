import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { TreeNode } from './tree-node';
import {TreeService} from './treeService'
import { TranslateService } from '@ngx-translate/core';

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
  constructor(private treeService: TreeService,public translate: TranslateService) {

    console.log(TreeComponent.loadedIntial)
    if(TreeComponent.loadedIntial!='Loaded'){
      this.getHardWareDetails();
      }
  }
  ngOnInit() {
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
  onCheck(e: any) {
    console.log('%c Returned checked object ', 'background: #222; color:  #ff8080');
    console.log(e);
    console.log('%c ************************************ ', 'background: #222; color: #bada05');
  }
  onCheckedKeys(e: any) {
    console.log('%c Returned array with checked checkboxes ', 'background: #222; color: #bada55');
    console.log(e);
    console.log('%c ************************************ ', 'background: #222; color: #bada05');
  }
  onNodesChanged(e: any) {
    console.log('%c Returned json with marked checkboxes ', 'background: #222; color: #99ccff');
    console.table(e);
    console.log('%c ************************************ ', 'background: #222; color: #bada05');
  }
}
