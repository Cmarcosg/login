import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.formFields = [
      {
        fieldName: 'email',
        initState: {
          initValue: null,
          disabled: false,
        },
        abstractControlOptions: {
          validators: [
            Validators.required,
            Validators.email,
            Validators.pattern(EMAIL_REGEXP),
          ],
          asyncValidators: [],
        },
        errorMessage: 'El email no es correcto',
      },
      {
        fieldName: 'pass',
        initState: {
          initValue: null,
          disabled: false,
        },
        abstractControlOptions: {
          validators: [Validators.required, Validators.minLength(5)],
          asyncValidators: [],
        },
        errorMessage: 'La contraseña no es correcta',
      },
      {
        fieldName: 'remindme',
        initState: {
          initValue: false,
          disabled: false,
        },
        abstractControlOptions: {
          validators: [],
          asyncValidators: [],
        },
      },
    ];
    fixture.detectChanges();
  });

  describe('LoginComponent - Controller Init lyfecyle', () => {
    it('set the form fields correctly', () => {
      component.formFields.forEach((formField) => {
        expect(component.form.controls[formField.fieldName]).toBeDefined();
      });
    });
  });

  describe('LoginComponent - Form change lifecycle', () => {
    it('should have error messages with errored filled form', () => {
      fillFormWithErrors(component);
      expect(component.errorMessages).toEqual([]);
      component.submitForm();
      expect(component.errorMessages).toEqual([
        { message: 'El email no es correcto' },
        { message: 'La contraseña no es correcta' },
      ]);
    });
    it('should be invalid with errored filled form', () => {
      fillFormWithErrors(component);
      component.submitForm();
      expect(component.form.valid).toBeFalsy();
    });
    it('should not have errors with correct filled form', () => {
      fillFormCorrecty(component);
      expect(component.errorMessages).toEqual([]);
      component.submitForm();
      expect(component.errorMessages).toEqual([]);
    });

    it('should be valid with correct filled form', () => {
      fillFormCorrecty(component);
      component.submitForm();
      expect(component.form.valid).toBeTruthy();
    });
  });
  describe('LoginComponent - Template', () => {
    it('should user text', () => {
      fillFormWithErrors(component);
      component.isSubmitted = true;
      fixture.detectChanges();
      expect(
        fixture.debugElement.query(By.css('.login__username')).nativeElement
          .textContent
      ).toContain('Prueba técnica');
    });

    it('should show Acceder as button text', () => {
      expect(
        fixture.debugElement.query(By.css('button')).nativeElement.textContent
      ).toContain('Acceder');
    });

    it('should show Recordar as reminder label', () => {
      expect(
        fixture.debugElement.query(By.css('.login__reminder')).nativeElement
          .textContent
      ).toContain('Recordar');
    });
  });
  describe('LoginComponent - Functions', () => {
    it('should work correctly funcion onFieldChange()', () => {
      const spy = spyOn(component, 'getErrorMessages');
      component.isJustSubmitted = true;
      component.onFieldChange();
      fixture.detectChanges();
      expect(component.isJustSubmitted).toBeFalsy();
      expect(spy).toHaveBeenCalled();
    });
    it('should work correctly funcion onChangeRemindMe()', () => {
      const spy = spyOn(component.form.controls.remindme, 'setValue');
      component.onChangeRemindme();
      fixture.detectChanges();
      expect(component.remindMe).toBeTruthy();
      expect(spy).toHaveBeenCalled();
      component.onChangeRemindme();
      fixture.detectChanges();
      expect(component.remindMe).toBeFalsy();
    });
    it('should work correctly funcion hasErrors()', () => {
      fillFormWithErrors(component);
      component.isSubmitted = true;
      fixture.detectChanges();
      expect(component.hasErrors).toBeTruthy();
    });
    it('should work correctly funcion submitForm()', () => {
      const spy = spyOn(component, 'getErrorMessages');
      component.submitForm();
      expect(component.isJustSubmitted).toBeTruthy();
      expect(component.isSubmitted).toBeTruthy();
      expect(spy).toHaveBeenCalled();
    });
  });
});

function fillFormCorrecty(component) {
  component.form.controls.email.setValue('correct@email.com');
  component.form.controls.pass.setValue('okoko');
}
function fillFormWithErrors(component) {
  component.form.controls.email.setValue('incorrect email');
  component.form.controls.pass.setValue('ko');
}
