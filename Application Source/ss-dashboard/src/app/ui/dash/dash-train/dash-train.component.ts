import { Component, OnInit } from '@angular/core';
import { ModelsService } from '../../../core/data/models.service';
import { TrainingStatus } from '../../../shared/models/training-status.enum';

@Component({
  selector: 'app-dash-train',
  templateUrl: './dash-train.component.html',
  styleUrls: ['./dash-train.component.scss']
})
export class DashTrainComponent implements OnInit {
  trained = TrainingStatus.Trained;
  training = TrainingStatus.Training;
  untrained = TrainingStatus.Untrained;
  constructor(public modelsService: ModelsService) { }

  ngOnInit() {
  }

}
