import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IFIELD } from 'src/app/interfaces/form.interface';
import { FORMS } from '../../constants/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  formFields: IFIELD[] = FORMS.LOGIN.FIELDS;
  remindMe = false;
  isSubmitted = false;
  isJustSubmitted = false;
  errorMessages = [];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }
  private createForm(): void {
    this.form = this.fb.group({});
    this.formFields.forEach((field) => {
      const control = this.fb.control(
        {
          value: field.initState.initValue,
          disabled: field.initState.disabled,
        },
        field.abstractControlOptions
      );
      this.form.addControl(field.fieldName, control);
    });
  }

  public onFieldChange(): void {
    this.isJustSubmitted = false;
    this.getErrorMessages();
  }

  public onChangeRemindme(): void {
    this.remindMe = !this.remindMe;
    this.form.controls.remindme.setValue(this.remindMe);
  }

  public hasErrors(): boolean {
    return this.formFields.some((field) => {
      return this.hasError(field.fieldName);
    });
  }

  public hasError(fieldName: string): boolean {
    const fieldHasError = !!this.form.controls[fieldName].errors;
    return fieldHasError && this.isSubmitted;
  }

  public getErrorMessages(): void {
    this.errorMessages = [];
    this.formFields.forEach((field) => {
      if (this.hasError(field.fieldName)) {
        this.errorMessages.push({ message: field.errorMessage });
      }
    });
  }

  public submitForm(): void {
    this.isJustSubmitted = true;
    this.isSubmitted = true;
    this.getErrorMessages();
    if (this.form.valid) {
      console.log('OK');
    }
  }

  public getAnimationClasses() {
    return {
      'login__submit--success': this.form.valid && this.isJustSubmitted,
      'login__submit--error': this.hasErrors() && this.isJustSubmitted,
    };
  }
}
