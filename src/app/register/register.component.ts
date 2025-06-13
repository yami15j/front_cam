import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  onSubmit() {
    alert('Formulario enviado correctamente (aún sin backend).');
    // Aquí puedes conectar con tu servicio de backend
  }
}
