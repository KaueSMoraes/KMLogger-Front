import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-form-card',
  standalone: true, // Se você estiver usando standalone components
  imports: [MatCardModule], // Importando MatCardModule diretamente
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.css']
})
export class FormCardComponent { }
