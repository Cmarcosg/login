import { AbstractControlOptions, ValidatorFn } from '@angular/forms';

export interface IFORM {
  [id: string]: IFormData;
}

export interface IFormData {
  FIELDS: IFIELD[];
}

export interface IFIELD {
  fieldName: string;
  initState: IinitState;
  errorMessage?: string;
  abstractControlOptions?: AbstractControlOptions;
}

export interface IinitState {
  initValue: null | string | boolean;
  disabled: boolean;
}
