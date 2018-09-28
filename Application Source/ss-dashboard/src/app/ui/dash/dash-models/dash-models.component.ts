import { Component, OnInit } from '@angular/core';
import { ModelsService } from '../../../core/data/models.service';

@Component({
  selector: 'app-dash-models',
  templateUrl: './dash-models.component.html',
  styleUrls: ['./dash-models.component.scss']
})
export class DashModelsComponent implements OnInit {

  constructor(public modelsService: ModelsService) { }

  ngOnInit() {
    this.getModels();
  }

  public getModels() {
    this.modelsService.getModelsAsPromise().then((model) => {
      console.log(model.name);
    });
  }
}
