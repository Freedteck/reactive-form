import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSemanticModule } from 'ngx-semantic';
import { ISelectOption } from 'ngx-semantic/modules/select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgxSemanticModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  country: string = '';
  occupation: string = '';
  successful: string = 'true';

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient
  ) {}

  countries: ISelectOption[] = [];

  private url: string = 'https://restcountries.com/v3.1/all';

  ngOnInit() {
    this.fetchCountries();
  }

  fetchCountries() {
    this.http.get(this.url).subscribe(
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

  occupations = [
    { text: 'Frontend Developer', value: 'frontend' },
    { text: 'Backend Developer', value: 'backend' },
    { text: 'Designer', value: 'design' },
    { text: 'Devops Engineer', value: 'devops' },
  ];

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.successful === 'true') {
        this.toastr.success('Form submitted successfully!', 'Success');
        this.router.navigate(['/success']);
      } else {
        this.toastr.error('Form submission failed. Please try again.', 'Error');
        this.router.navigate(['/']);
      }
    } else {
      this.toastr.warning('Please fill out all required fields.', 'Warning');
    }
  }
}
