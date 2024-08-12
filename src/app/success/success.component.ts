import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxSemanticModule } from 'ngx-semantic';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterLink, NgxSemanticModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent {}
