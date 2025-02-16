import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { LogoComponent } from '../../components/logo/logo.component';
import { BeginLayoutComponent } from "../../layouts/begin-layout/begin-layout.component";
import { FormCardComponent } from '../../components/form-card/form-card.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    LogoComponent,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    BeginLayoutComponent,
    FormCardComponent,
    MatSnackBarModule,
],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent  {
  loginForm: FormGroup;

  //Quando constroi o componente, cria o formulário de login com base no FormBuilder
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login realizado com:', this.loginForm.value);
    }
  }
}