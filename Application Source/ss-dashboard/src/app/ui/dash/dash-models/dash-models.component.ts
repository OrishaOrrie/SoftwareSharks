import { Component, OnInit } from '@angular/core';
import { ModelsService } from '../../../core/data/models.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../core/alert/alert.service';
import { Alert } from '../../../shared/models/alert';
import { AlertType } from '../../../shared/models/AlertType';

@Component({
  selector: 'app-dash-models',
  templateUrl: './dash-models.component.html',
  styleUrls: ['./dash-models.component.scss']
})
export class DashModelsComponent implements OnInit {

  constructor(
    private router: Router,
    public modelsService: ModelsService,
    private alertService: AlertService) {
  }

  ngOnInit() {
  }

  public goToModelsEdit() {
    this.router.navigateByUrl('/dashboard/(sidebar:models-create)');
  }

  public deleteModel(id) {
    this.modelsService.deleteModel(id).then(() => {
      this.alertService.add(new Alert(AlertType.Success, 'Model successfully deleted!', 'WooHoo!', ':)'));
    });
}
}
