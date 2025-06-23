import {Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
// ...código existente...
export class HomeComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30;
  porcentajeRestante: number = 100;
  mostrarError: boolean = false;
  mostrarQR: boolean = true;
  codigoValido: boolean = false;

  busquedaDeshabilitada: boolean = true; 

  private intervalo: any;

  @ViewChild('inputBusqueda') inputBusqueda!: ElementRef<HTMLInputElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
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
        this.codigoValido = true;

        setTimeout(() => {
          this.router.navigate(['/siguiente-pantalla']);
        }, 2000);
      }
    }, 1000);
  }

 onCodeScanned(code: string) {
  if (code === 'CODIGO_ESPERADO') {
    this.codigoValido = true;
    this.mostrarError = false;
    clearInterval(this.intervalo); // Detener temporizador
    setTimeout(() => {
      this.router.navigate(['/validcode']); // Página de éxito
    }, 2000);
  } else {
    this.mostrarError = true;
    this.codigoValido = false;
    this.mostrarQR = false;

    setTimeout(() => {
      this.mostrarError = false; // Oculta el error después de 3 segundos
      this.mostrarQR = true;
    }, 3000);
  }
}


  habilitarBusqueda() {
    this.busquedaDeshabilitada = false;
    this.inputBusqueda.nativeElement.focus();
  }
}
