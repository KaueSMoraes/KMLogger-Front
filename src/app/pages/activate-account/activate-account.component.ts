import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilderComponent } from '../../components/form-builder/form-builder.component';
import { BeginLayoutComponent } from '../../layouts/begin-layout/begin-layout.component';
import { LogoComponent } from '../../components/logo/logo.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CodeInputComponent } from '../../components/code-input/code-input.component';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [
    FormBuilderComponent,
    BeginLayoutComponent,
    LogoComponent,
    CommonModule,
    MatFormFieldModule,
    CodeInputComponent
  ],
  template: `
    <app-begin-layout>
      <div class="login-container">
        <div class="logo-container">
          <app-logo></app-logo>
        </div>

        <app-form-builder
          [fields]="fields"
          [form]="form"
          [submitButtonLabel]="'Reativar'"
          [extraButtons]="extraButtons"
          (formSubmit)="onActivateAccount($event)">
          <h2 form-title>Digite o código para ativar sua conta</h2>
          <app-code-input formControlName="code"></app-code-input>
        </app-form-builder>
      </div>
    </app-begin-layout>
  `
})
export class ActivateAccountComponent extends BaseComponent {
  form: FormGroup;
  email!: string;

  fields = [
    {
      name: 'code',
      label: 'Código de Ativação',
      type: 'code',
      required: true,
      validators: [Validators.required, Validators.pattern(/^\d{4}$/)],
      errorMessages: {
        required: 'O código é obrigatório.',
        pattern: 'O código deve ter 4 números.'
      }
    }
  ];

  extraButtons = [
    { label: 'Voltar para Login', action: new EventEmitter<void>() }
  ];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    snackBar: MatSnackBar,
    router: Router
  ) {
    super(snackBar, router);

    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });

    this.form = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]]
    },
    this.extraButtons[0].action.subscribe(() => this.navigateTo('/login'))
    );
  }

  onActivateAccount(formData: any) {
    if (this.form.invalid) return;

    this.authService.activate({ email: this.email, code: formData.code }, "/activate").subscribe({
      next: (response) => {
        this.showMessage(response, 'success');
        setTimeout(() => {
          this.navigateTo('/activate-account');
        }, 2000);
      },
      error: (error) => this.showMessage(error, 'error')
    });
  }


  resendCode() {
    this.authService.resendCode(this.email).subscribe({
      next: (response) => this.showMessage('Código reenviado!', 'success'),
      error: (error) => this.showMessage(error, 'error')
    });
  }
}
