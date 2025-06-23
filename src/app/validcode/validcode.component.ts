import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  ViewChild,
  ElementRef
} from '@angular/core';
import { isPlatformBrowser, CommonModule, NgIf, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, NgIf],
  templateUrl: './validcode.component.html',
  styleUrls: ['./validcode.component.css']
})
export class ValidcodeComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30;
  porcentajeRestante: number = 100;
  mostrarError: boolean = false;
  mostrarQR: boolean = true;
  codigoValido: boolean = false; // 🔹 NUEVO: para mostrar mensaje
  private intervalo: any;

  @ViewChild('inputBusqueda') inputBusqueda!: ElementRef<HTMLInputElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router // 🔹 Importamos el Router para redirigir
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.iniciarTemporizador();
    }
  }

  ngOnDestroy() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  iniciarTemporizador() {
    const tiempoTotal = 30;
    this.tiempoRestante = tiempoTotal;
    this.porcentajeRestante = 100;
    this.mostrarError = false;
    this.mostrarQR = true;
    this.codigoValido = false;

    this.intervalo = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
        this.porcentajeRestante = (this.tiempoRestante / tiempoTotal) * 100;
      } else {
        clearInterval(this.intervalo);
        this.mostrarError = false;
        this.mostrarQR = false;
        this.codigoValido = true; // 🔹 Mostrar mensaje de "Código válido"

        // 🔹 Redirigir a otra pantalla después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/siguiente-pantalla']); // cambia la ruta según tu app
        }, 2000);
      }
    }, 1000);
  }
}
