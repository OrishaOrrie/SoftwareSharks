import { Component, OnInit, Input } from '@angular/core';
import { Model } from '../../../shared/models/model';
import { ModelsService } from '../../../core/data/models.service';
import { AlertService } from '../../../core/alert/alert.service';
import { Alert } from '../../../shared/models/alert';
import { AlertType } from '../../../shared/models/AlertType';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-dash-models-edit',
  templateUrl: './dash-models-edit.component.html',
  styleUrls: ['./dash-models-edit.component.scss']
})
export class DashModelsEditComponent implements OnInit {
  @Input()
  model: Model;

  @Input()
  val;

  editModelForm = this.fb.group({
    name: ['', Validators.required],
    categories: this.fb.array([
      this.fb.control('')
    ], Validators.required)
  });

  constructor(
    private fb: FormBuilder,
    private modelService: ModelsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  setCurrentModel() {
    // console.log(this.model);
    this.editModelForm.patchValue({
      name: this.model.name
    });
    this.editModelForm.setControl('categories', this.fb.array(this.model.categories || []));
  }
  // #editModelModal
  onSubmit() {
    // TODO: Use EventEmitter with form value
    // const model: Model = this.newModelForm.value as Model;
    // model.uri = 'None';
    // model.trained = false;
    // this.updateModel().then(() => {
    //   this.editModelForm.reset();
    //   this.alertService.add(new Alert(AlertType.Success, 'Model successfully created!', 'WooHoo!', ':)'));
    // }).catch((error) => {
    //   this.alertService.add(new Alert(AlertType.Danger, 'Looks like something went wrong!', 'Oh No!', ':('));
    //   console.log(error);
    // });
  }

  public updateModel() {
    // console.log(modelData);
    const editedModel: Model = this.editModelForm.value as Model;
    this.modelService.updateModel(this.model.id, editedModel).then(() => {
      this.editModelForm.reset();
      this.alertService.add(new Alert(AlertType.Success, 'Model successfully edited!', 'WooHoo!', ':)'));
      // console.log(this.model.id, editedModel);
    });
  }

  get categories() {
    feather.replace();
    return this.editModelForm.get('categories') as FormArray;
  }

  addCategory() {
    this.categories.push(this.fb.control(''));
  }

  removeCategory(index) {
    if (index > 0) {
      this.categories.removeAt(index);
    }
  }
}
