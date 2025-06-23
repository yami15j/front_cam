import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ZXingScannerModule,
        RouterTestingModule
      ],
      declarations: [HomeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería iniciar con 30 segundos', () => {
    expect(component.tiempoRestante).toBe(30);
  });

  it('debería reducir el tiempoRestante después de 1 segundo', (done) => {
    component.iniciarTemporizador();
    setTimeout(() => {
      expect(component.tiempoRestante).toBeLessThan(30);
      done();
    }, 1100);
  });
});
