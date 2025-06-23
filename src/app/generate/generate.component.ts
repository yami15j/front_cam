import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-generate',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent {
  habilitarBusqueda() {
    const input = document.getElementById('inputBusqueda') as HTMLInputElement;
    if (input) {
      input.disabled = false;
      input.focus();
    }
  }
}
