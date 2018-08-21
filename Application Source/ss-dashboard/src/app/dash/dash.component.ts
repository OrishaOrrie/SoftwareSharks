import { UserModel } from './../model/userModel';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.less']
})
export class DashComponent implements OnInit {
  isCollapsed = false;
  triggerTemplate = null;

  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  constructor() { }

  ngOnInit() {
  }

  testModel() {
    const um: UserModel = new UserModel;
    console.log(um.getNumClasses());
    um.addClass('Glasses');
    um.addClass('Popper');
    console.log(um.getNumClasses());
    um.printClasses();
  }

}
