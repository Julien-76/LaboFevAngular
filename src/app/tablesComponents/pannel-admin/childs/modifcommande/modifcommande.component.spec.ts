import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifcommandeComponent } from './modifcommande.component';

describe('ModifcommandeComponent', () => {
  let component: ModifcommandeComponent;
  let fixture: ComponentFixture<ModifcommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifcommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
