import { Component, OnInit } from '@angular/core';
import { ModelsService } from '../../../core/data/models.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-dash-models',
  templateUrl: './dash-models.component.html',
  styleUrls: ['./dash-models.component.scss']
})
export class DashModelsComponent implements OnInit {

  constructor(public modelsService: ModelsService) { 
  }

  ngOnInit() {
    // this.getModels();
  }

  public getModels() {
    console.log("Calling getModels");
    this.modelsService.modelsObservable.pipe(
      switchMap(models => {
        if (models) {
          // return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          console.log("Kind of not broken");
          console.log(models);
          return of(null);
        } else {
          console.log("Dis is broken af");
          return of(null);
        }
      })
    );
    // this.modelsService.getModelsAsPromise().then((model) => {
    //   console.log(model.name);
    // });
  }
}
