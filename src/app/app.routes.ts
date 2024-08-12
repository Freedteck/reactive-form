import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { SuccessComponent } from './success/success.component';

export const routes: Routes = [
  { path: '', component: FormComponent, title: 'Form' },
  { path: 'success', component: SuccessComponent, title: 'Success' },
];
