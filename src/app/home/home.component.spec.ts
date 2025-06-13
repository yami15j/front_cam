import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
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