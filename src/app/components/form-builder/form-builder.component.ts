import { Component, Output, EventEmitter, OnInit, Input, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="form-card">
      <mat-card>
        <mat-card-title>
          <ng-content select="[form-title]"></ng-content>
        </mat-card-title>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            
          <mat-form-field *ngFor="let field of fields" appearance="outline">
            <mat-label>{{ field.label }}</mat-label>
            <input 
              matInput 
              [type]="field.type || 'text'" 
              [formControlName]="field.name" 
              [required]="!!field.required" 
              style="color: var(--text-color)"/>

            <mat-error *ngFor="let error of getErrors(field.name)">
              {{ error }}
            </mat-error>
          </mat-form-field>

          <div class="button-container">
              <button mat-raised-button type="submit" style="color: var(--teciary-color) !important;" [disabled]="form.invalid">
                {{ submitButtonLabel }}
              </button>

              <button 
                *ngFor="let extraButton of extraButtons" 
                mat-button 
                (click)="extraButton.action.emit()">
                {{ extraButton.label }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .form-card mat-card {
      background: transparent; 
      border: 2px solid var(--primary-color); 
      border-radius: 12px;
      backdrop-filter: blur(10px); 
      padding: 20px;
      text-align: center;
      color: white; 
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); 
      max-width: 400px;
      width: 100%;
  }

    mat-card-title {
    font-size: 15px;
    font-weight: bold;
    color: var(--primary-color); 
  }

  mat-form-field {
      width: 100%;
      margin-bottom: 15px;  
  }

    input.mat-input-element {
        background: transparent !important; 
        border-bottom: 2px solid #7B00FF !important; 
        color: red !important;  /* 🔹 Texto digitado fica branco */
        caret-color: white !important; /* 🔹 Cor do cursor */
        opacity: 1 !important; /* 🔹 Impede que fique transparente */
    }

    ::ng-deep input.mat-input-element {
        color: white !important;
        caret-color: white !important;
        opacity: 1 !important;
    }

    ::ng-deep input.mat-input-element[disabled],
    ::ng-deep input.mat-input-element:disabled {
        opacity: 1 !important;
        color: white !important;
    }

    ::ng-deep .mat-form-field-label {
        color: rgba(255, 255, 255, 0.7) !important;  
    }

    ::ng-deep .mat-form-field.mat-focused .mat-form-field-label {
        color: #7B00FF !important;  
    }

    ::ng-deep .mat-input-element::placeholder {
        color: rgba(255, 255, 255, 0.6) !important;
        opacity: 1 !important;
    }
        button {
        background: #6200ea; /* 🔹 Cor principal do botão ativo */
        color: white !important; 
        width: 100%;
        padding: 10px;
        border-radius: 6px;
        font-weight: bold;
        transition: 0.3s ease;
    }

    /* Estilo do botão habilitado */
    button.mat-raised-button {
        background: #6200ea !important; /* 🔹 Roxo escuro */
        color: #6200ea !important; /* 🔹 Texto branco */
    }

    /* Hover no botão ativado */
    button.mat-raised-button:hover {
        background: #5400d4 !important;
    }

    /* 🔹 Ajustando o layout dos botões */
    .button-container {
        display: flex;
        flex-direction: column;
        gap: 10px; 
        margin-top: 20px;  
        color: var(--primary-color);
    }
  `]
})

export class FormBuilderComponent implements OnInit {
  @Input() title: string = 'Formulário';
  @Input() fields: { 
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    validators?: ValidatorFn[];
    errorMessages?: { [key: string]: string }; 
  }[] = [];

  @Input() form!: FormGroup; 
  @Input() submitButtonLabel: string = 'Enviar';
  @Input() extraButtons: { label: string; action: EventEmitter<void> }[] = [];

  @Output() formSubmit = new EventEmitter<any>();

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

    getErrors(fieldName: string): string[] {
    const control = this.form.get(fieldName);
    if (!control || !control.errors || !this.fields) return [];

    const field = this.fields.find(f => f.name === fieldName);
    if (!field || !field.errorMessages) return [];

    return Object.keys(control.errors)
      .map(errorKey => field.errorMessages?.[errorKey])
      .filter(msg => msg !== undefined) as string[];
  }
}



