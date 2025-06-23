import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidcodeComponent } from './validcode.component'; // ✅ nombre y ruta correctos

describe('ValidcodeComponent', () => {
  let component: ValidcodeComponent;
  let fixture: ComponentFixture<ValidcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidcodeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
