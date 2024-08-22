import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSemanticModule } from 'ngx-semantic';
import { ISelectOption } from 'ngx-semantic/modules/select';
import { NotificationService } from '../notification.service';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, NgxSemanticModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  profileForm!: FormGroup;
  countries: ISelectOption[] = [];
  occupations = [
    { text: 'Frontend Developer', value: 'frontend' },
    { text: 'Backend Developer', value: 'backend' },
    { text: 'Designer', value: 'design' },
    { text: 'Devops Engineer', value: 'devops' },
  ];
  submited: boolean = false;
  isLoading: boolean = false;
  isError: boolean = true;

  // Initialize the form
  initializeForm() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, this.passwordValidator]],
      phoneNumber: ['', Validators.required],
      country: ['', Validators.required],
      occupation: ['', Validators.required],
      successful: ['true'],
    });
  }

  ngOnInit() {
    this.loadCountries();
    this.initializeForm();
  }

  // Load countries
  loadCountries() {
    this.countryService.fetchCountries().subscribe(
      (data: any) => {
        console.log(data);

        this.countries = data
          .map((country: any) => ({
            text: country.name.common,
            value: country.cca2,
            image: { src: country.flags.png, avatar: false },
          }))
          .sort((a: any, b: any) => a.text.localeCompare(b.text));
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  // Inject the NotificationService
  notificationService: NotificationService = inject(NotificationService);

  // Custom password validator
  passwordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const lowerCase = /[a-z]/;
    const upperCase = /[A-Z]/;
    const digit = /\d/;
    const specialCharacter = /\W/;

    const hasLowerCase = !lowerCase.test(control.value);
    const hasUpperCase = !upperCase.test(control.value);
    const hasDigit = !digit.test(control.value);
    const hasSpecialCharacter = !specialCharacter.test(control.value);
    const hasMinimumValue = control.value.length < 8;

    if (hasUpperCase || hasSpecialCharacter || hasMinimumValue) {
      return {
        hasUpperCase,
        hasSpecialCharacter,
        hasMinimumValue,
      };
    }

    return null;
  };

  // Check if the form control is invalid
  isInValid(controlName: string): boolean | undefined {
    const control = this.profileForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  // Submit the form
  onSubmit() {
    this.submited = true;
    this.isLoading = true;

    // Simulate form submission
    if (this.profileForm.valid) {
      if (this.profileForm.get('successful')?.value === 'true') {
        setTimeout(() => {
          this.isLoading = false;
          this.notificationService.showSuccess(
            'Success! Form submitted successfully!'
          );
          this.router.navigate(['/success']);
        }, 5000);
      } else {
        setTimeout(() => {
          this.isLoading = false;
          this.notificationService.showError(
            'Form submission failed. Please try again.'
          );
          this.router.navigate(['/']);
        }, 5000);
      }
    } else {
      this.notificationService.showWarning(
        'Please fill out all required fields.'
      );
      this.isLoading = false;
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private countryService: CountryService
  ) {}
}
