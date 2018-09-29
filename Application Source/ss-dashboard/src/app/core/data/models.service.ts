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

  // private _models: BehaviorSubject<List<Model>> = new BehaviorSubject(List([]));
  // public get models() {
  //   return this._models.asObservable();
  // }
  // public readonly models: Observable<List<Model>> = this._models.asObservable();


  public modelsObservable: Observable<Model[]>;
  // userSubscription: Subscription;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
  ) {
    // this.loadInitialData();
    console.log("Constructor Called");

    this.auth.user.subscribe(
      user => {
        if (user) {
          // console.log('Loading initial Data');
          this.modelsObservable = this.afs.collection<Model>(`users/${user.uid}/model`).valueChanges();
          // console.log('After Loading');
        } else {
          console.log('Failed to load initial Data');
          this.modelsObservable = of(null);
        }
      }
    );

    // this.modelsObservable = this.auth.user.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       console.log('Loading initial Data');
    //       return this.afs.collection<Model>(`users/${user.uid}/model`).stateChanges(); // .valueChanges();
    //     } else {
    //       console.log('Failed to load initial Data');
    //       return of(null);
    //     }
    //   }));
    // console.log(this.modelsObservable);
  }

  // public loadInitialData() {
  //   this.modelsObservable = this.auth.user.pipe(
  //     switchMap(user => {
  //       if (user) {
  //         console.log('Loading initial Data');
  //         return this.afs.collection<Model>(`users/${user.uid}/model`).valueChanges();
  //       } else {
  //         console.log('Failed to load initial Data');
  //         return of(null);
  //       }
  //     })
  //   );
    // this.auth.user.subscribe(
    //   (user) => {
    //     this.modelsObservable = this.afs.collection<Model>(`users/${user.uid}/model`).valueChanges();
    //   },
    //   (err) => {
    //     console.log("Error retrieving Models");
    //     this.modelsObservable = of(null);
    //   });
  // }
  // public getModelsAsPromise() {
  //   return this.modelsObservable.toPromise();
  // }

  // private updateModelData(user, model) {
  //   // Sets user data to firestore on login

  //   // const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  //   const modelRef: AngularFirestoreCollection<any> = this.afs.doc(`users/${user.uid}`).collection('model').doc;
  //   const data = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL
  //   };
  //   modelRef.
  //   return modelRef.set(data, { merge: true });

  // }
}
