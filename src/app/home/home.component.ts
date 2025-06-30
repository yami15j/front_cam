import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  tiempoRestante: number = 30;
  porcentajeRestante: number = 100;
  formatoTiempo: string = '00:30';
  mostrarQR: boolean = true;
  codigoValido: boolean = false;
  mostrarError: boolean = false;
  busquedaDeshabilitada: boolean = true;

  qrCodeUrl: string = '/imagenes/qr1.png';
  qrList: string[] = [
    '/imagenes/qr1.png',
    '/imagenes/qr2.png',
    '/imagenes/qr3.png'
  ];
  indiceQR: number = 0;

  private intervalo: any;

  @ViewChild('inputBusqueda') inputBusqueda!: ElementRef<HTMLInputElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.iniciarCicloQR();
    }
  }

  ngOnDestroy() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  iniciarCicloQR() {
    this.generarNuevoQR();
    this.iniciarTemporizador();
  }

  generarNuevoQR() {
    this.indiceQR = (this.indiceQR + 1) % this.qrList.length;
    this.qrCodeUrl = this.qrList[this.indiceQR];
    this.mostrarQR = true;
    this.codigoValido = false;
    this.tiempoRestante = 15;
    this.porcentajeRestante = 100;
    this.formatoTiempo = this.convertirASegundos(this.tiempoRestante);
  }

  generarNuevoCodigo() {
    if (this.intervalo) clearInterval(this.intervalo);
    this.generarNuevoQR();
    this.iniciarTemporizador();
  }

  iniciarTemporizador() {
    if (this.intervalo) clearInterval(this.intervalo);

    this.intervalo = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
        this.porcentajeRestante = (this.tiempoRestante / 30) * 100;
        this.formatoTiempo = this.convertirASegundos(this.tiempoRestante);
      } else {
        clearInterval(this.intervalo);
        this.mostrarQR = false;
        this.codigoValido = false;

        const espera = Math.floor(Math.random() * 4) + 7; // Entre 7 y 10 segundos
        setTimeout(() => {
          this.generarNuevoQR();
          this.iniciarTemporizador();
        }, espera * 1000);
      }
    }, 1000);
  }

  convertirASegundos(segundos: number): string {
    const m = Math.floor(segundos / 60).toString().padStart(2, '0');
    const s = (segundos % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  onCodeScanned(code: string) {
    if (code === 'CODIGO_ESPERADO') {
      this.codigoValido = true;
      this.mostrarError = true;
      clearInterval(this.intervalo);
      setTimeout(() => {
        this.router.navigate(['/validcode']);
      }, 2000);
    } else {
      this.mostrarError = true;
      this.codigoValido = false;
      this.mostrarQR = true;

      setTimeout(() => {
        this.mostrarError = false;
        this.mostrarQR = true;
      }, 3000);
    }
  }

  habilitarBusqueda() {
    this.busquedaDeshabilitada = false;
    this.inputBusqueda.nativeElement.focus();
  }


  irAGenerar() {
    this.router.navigate(['/generate']);
  }
}
