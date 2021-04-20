import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacepersoComponent } from './espaceperso.component';

describe('EspacepersoComponent', () => {
  let component: EspacepersoComponent;
  let fixture: ComponentFixture<EspacepersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspacepersoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspacepersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
