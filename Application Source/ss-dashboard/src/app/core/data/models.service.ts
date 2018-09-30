import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, of, Subscription, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Model } from '../../shared/models/model';
import { List } from 'immutable';

@Injectable()
export class ModelsService {

  public modelsObservable: Observable<Model[]>;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
  ) {
    this.auth.user.subscribe(
      user => {
        if (user) {
          this.modelsObservable = this.afs.collection<Model>(`users/${user.uid}/model`).valueChanges();
        } else {
          console.log('Failed to load initial Data');
          this.modelsObservable = of(null);
        }
      }
    );
  }

  //TODO: Complete GetModels Function - Retrieve Model objects from observable
  public getModels() {
    // console.log("Calling getModels");
    this.modelsObservable.pipe(
      switchMap(models => {
        if (models) {
          return null;
        } else {
          return of(null);
        }
      })
    );
    // this.modelsService.getModelsAsPromise().then((model) => {
    //   console.log(model.name);
    // });
  }

}
