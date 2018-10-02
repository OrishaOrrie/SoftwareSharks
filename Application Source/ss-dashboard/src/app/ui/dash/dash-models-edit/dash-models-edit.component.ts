import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import * as feather from 'feather-icons';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModelsService } from '../../../core/data/models.service';
import { Model } from '../../../shared/models/model';
import { AlertService } from '../../../core/alert/alert.service';
import { AlertType } from '../../../shared/models/AlertType';
import { Alert } from '../../../shared/models/alert';

@Component({
  selector: 'app-dash-models-edit',
  templateUrl: './dash-models-edit.component.html',
  styleUrls: ['./dash-models-edit.component.scss']
})
export class DashModelsEditComponent implements OnInit {

  newModelForm = this.fb.group({
    name: ['', Validators.required],
    categories: this.fb.array([
      this.fb.control('')
    ], Validators.required)
  });

  models: Model[];

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private modelService: ModelsService,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    const model: Model = this.newModelForm.value as Model;
    model.uri = 'None';
    model.trained = false;
    this.saveModel(model).then(() => {
      this.newModelForm.reset();
      this.alertService.add(new Alert(AlertType.Success, 'Model successfully created!', 'WooHoo!', ':)'));
    }).catch((error) => {
      this.alertService.add(new Alert(AlertType.Danger, 'Looks like something went wrong!', 'Oh No!', ':('));
      console.log(error);
    });
  }

  get categories() {
    feather.replace();
    return this.newModelForm.get('categories') as FormArray;
  }

  addCategory() {
    this.categories.push(this.fb.control(''));
  }

  removeCategory(index) {
    if (index > 0) {
      this.categories.removeAt(index);
    }
  }

  saveModel(modelData: Model) {
    // console.log(modelData);
    return this.modelService.addModel(modelData);
  }
}
