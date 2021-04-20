import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PannelAdminComponent } from './pannel-admin.component';

describe('PannelAdminComponent', () => {
  let component: PannelAdminComponent;
  let fixture: ComponentFixture<PannelAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PannelAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PannelAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
