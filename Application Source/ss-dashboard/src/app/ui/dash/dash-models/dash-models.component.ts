import { Component, OnInit } from '@angular/core';
import { ModelsService } from '../../../core/data/models.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-models',
  templateUrl: './dash-models.component.html',
  styleUrls: ['./dash-models.component.scss']
})
export class DashModelsComponent implements OnInit {

  constructor(
    private router: Router,
    public modelsService: ModelsService) {
  }

  ngOnInit() {
  }

  public goToModelsEdit() {
    this.router.navigateByUrl('/dashboard/(sidebar:models-edit)');
  }
}
