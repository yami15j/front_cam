import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasComponent } from './horas.component';

describe('HorasComponent', () => {
  let component: HorasComponent;
  let fixture: ComponentFixture<HorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
