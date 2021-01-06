
import {AbstractControl } from '@angular/forms';
export function ValidateUrl(control: AbstractControl): {[key: string]: any} | null  {
  let httpCheck = control.value.split('/')[0];
  let type = control.value.split('.');
  let format = type[type.length - 1];
  if ((httpCheck == 'http:' || httpCheck == 'https:') && format == 'jpg') {
    return null;
  }else if(control.value == '' || control.value == null){
    return null;
  }
  return { 'urlInvalid': true };
  
}
