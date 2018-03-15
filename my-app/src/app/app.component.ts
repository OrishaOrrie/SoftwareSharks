import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BISI Image APP';

  showUpload:boolean = false;
}

/*@Component({
  selector:'menu-icons-example',
  templateUrl:'menu-icons-example.html',
  styleUrls:['menu-icons-example.css'],
})
export class MenuIconsExample {}*/
