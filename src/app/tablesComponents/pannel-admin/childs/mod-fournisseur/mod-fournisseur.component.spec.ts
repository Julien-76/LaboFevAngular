import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModFournisseurComponent } from './mod-fournisseur.component';

describe('ModFournisseurComponent', () => {
  let component: ModFournisseurComponent;
  let fixture: ComponentFixture<ModFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
