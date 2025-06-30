import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css'], // CORRECCIÓN: es "styleUrls" plural
  standalone: true,                   // Si quieres usar imports debes activar standalone
  imports: [RouterLink]               // Solo si usas standalone
})
export class QRComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30;
  private intervalo: any;

  ngOnInit() {
    this.iniciarTemporizador();
  }

  iniciarTemporizador() {
    this.tiempoRestante = 30;
    this.intervalo = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        clearInterval(this.intervalo);
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }
}
