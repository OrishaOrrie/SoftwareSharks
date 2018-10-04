import { Component, OnInit } from '@angular/core';
import { ModelsService } from '../../../core/data/models.service';
import { TrainingStatus } from '../../../shared/models/training-status.enum';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dash-train',
  templateUrl: './dash-train.component.html',
  styleUrls: ['./dash-train.component.scss']
})
export class DashTrainComponent implements OnInit {
  trained = TrainingStatus.Trained;
  training = TrainingStatus.Training;
  untrained = TrainingStatus.Untrained;
  constructor(
    public modelsService: ModelsService,
    private http: HttpClient) { }

  ngOnInit() {
  }

  sendTrainRequest() {
    const url = 'http://localhost:3000/trainModel';
    const data = {
        'name': 'Animals',
        'categories': [
          'Dogs',
          'Cats',
          'Birds'
        ]
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    this.http.post<any[]>(url, JSON.stringify(data), httpOptions).toPromise().then((response) => {
      console.log(response);
    });
    // console.log(this.http.post<any[]>(url, data, httpOptions));
  }

}
