import { Component, OnInit } from '@angular/core';
import { ModelsService } from '../../../core/data/models.service';
import { TrainingStatus } from '../../../shared/models/training-status.enum';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Model } from '../../../shared/models/model';
import { AuthService } from '../../../core/auth.service';
import { BackendService } from '../../../core/http/backend.service';
import { ConfirmationResponse } from '../../../shared/models/responses/confirmation-response';

@Component({
  selector: 'app-dash-train',
  templateUrl: './dash-train.component.html',
  styleUrls: ['./dash-train.component.scss']
})
export class DashTrainComponent implements OnInit {
  trained = TrainingStatus.Trained;
  training = TrainingStatus.Training;
  untrained = TrainingStatus.Untrained;

  private response: ConfirmationResponse;
  private error;

  constructor(
    public modelsService: ModelsService,
    private backend: BackendService) { }

  ngOnInit() {
  }

  sendTrainRequest(model: Model) {
    this.backend.sendTrainRequest(model)
      .subscribe(
        (response: ConfirmationResponse) => this.response = {... response},
        error => this.error = error);
  }

}
