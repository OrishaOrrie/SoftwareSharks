import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Model } from '../../shared/models/model';

@Injectable()
export class ModelsService {

  models: Observable<Model>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private auth: AuthService
    ) {
        //// Get auth data, then get firestore models collection || null
        this.models = this.afAuth.authState.pipe(
          switchMap(user => {
            if (user) {
              // return this.afs.doc<Model>(`users/${user.uid}`).valueChanges();
              this.afs.collection<Model>(`users/${user.uid}/model`).valueChanges();
            } else {
              return of(null);
            }
          })
        );
  }
}
