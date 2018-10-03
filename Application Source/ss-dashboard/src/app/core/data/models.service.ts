import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Model } from '../../shared/models/model';

@Injectable()
export class ModelsService {

  models: AngularFirestoreCollection<Model>;
  private modelDoc: AngularFirestoreDocument<Model>;

  private basePath: string;

  public modelsObservable: Observable<any[]>;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
  ) {
    this.modelsObservable = of(null);
    this.auth.user.subscribe(
      user => {
        if (user) {
          this.basePath = `users/${user.uid}/model`;
          this.models = afs.collection<Model>(this.basePath);
          this.modelsObservable = this.afs.collection<Model>(this.basePath).snapshotChanges().pipe(map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data() as Model;
              const id = a.payload.doc.id;
              return {id, ...data};
            });
          }));
        } else {
          // console.log('Failed to load initial Data');
          this.modelsObservable = of(null);
        }
      }
    );
  }

  public getModelsObservable() {
    return this.modelsObservable;
  }

  // TODO: Complete GetModels Function - Retrieve Model objects from observable
  public getModels() {
    this.modelsObservable.pipe(
      switchMap(models => {
        if (models) {
          return null;
        } else {
          return of(null);
        }
      })
    );
  }

  public addModel(model) {
    return this.models.add(model).then((ref) => {
      return true;
    });
  }

  public updateModel(id, update) {
    this.modelDoc = this.afs.doc<Model>(this.basePath + `/${id}`);
    return this.modelDoc.update(update).then(() => {
      return true;
    });
  }

  public deleteModel(id) {
    this.modelDoc = this.afs.doc<Model>(this.basePath + `/${id}`);
    return this.modelDoc.delete().then(() => {
      return true;
    });
  }
}
