import { Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import * as feather from 'feather-icons';
import { ModelsService } from '../../../core/data/models.service';
import { Model } from '../../../shared/models/model';
import { AlertService } from '../../../core/alert/alert.service';
import { AlertType } from '../../../shared/models/AlertType';
import { Alert } from '../../../shared/models/alert';
import { TrainingStatus } from '../../../shared/models/training-status.enum';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-dash-models-create',
  templateUrl: './dash-models-create.component.html',
  styleUrls: ['./dash-models-create.component.scss']
})
export class DashModelsCreateComponent implements OnInit, AfterViewInit {

  newModelForm = this.fb.group({
    name: ['', Validators.required],
    categories: this.fb.array([
      this.fb.control('')
    ], Validators.required)
  });

  models: Model[];

  @ViewChildren('categoriesInput') categoriesInput: QueryList<any>;

  constructor(
    private fb: FormBuilder,
    private modelService: ModelsService,
    private alertService: AlertService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.categoriesInput.changes.subscribe(formArray => {
      // console.log(formArray);
      const lastCatParent: HTMLElement = formArray.last.nativeElement;
      const lastCatInput = lastCatParent.firstElementChild.firstElementChild as HTMLElement;
      lastCatInput.focus();
      this.cdr.detectChanges();
    });
  }

  onSubmit() {
    // Dismiss Modal
    $('#confirmationModal').modal('hide');
    // TODO: Use EventEmitter with form value
    const model: Model = this.newModelForm.value as Model;
    model.uri = 'None';
    model.trained = false;
    model.status = TrainingStatus.Untrained;
    this.saveModel(model).then(() => {
      this.newModelForm.reset();
      this.alertService.add(new Alert(AlertType.Success, 'Model successfully created!', 'WooHoo!', ':)'));
      // Todo: Fix route
      this.router.navigate(['/dashboard/(sidebar:models)']);
    }).catch((error) => {
      this.alertService.add(new Alert(AlertType.Danger, 'Looks like something went wrong!', 'Oh No!', ':('));
      console.log(error);
    });
  }

  get categories() {
    feather.replace();
    return this.newModelForm.get('categories') as FormArray;
  }

  async addCategory() {
    await this.categories.push(this.fb.control(''));
  }

  removeCategory(index) {
    if (index > 0) {
      this.categories.removeAt(index);
    }
  }

  saveModel(modelData: Model) {
    return this.modelService.addModel(modelData);
  }

  async keytab(index) {
    if (index === this.categories.length - 1) {
      await this.addCategory();
    }
  }
}
