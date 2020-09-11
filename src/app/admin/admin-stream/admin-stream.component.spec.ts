import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStreamComponent } from './admin-stream.component';

describe('AdminStreamComponent', () => {
  let component: AdminStreamComponent;
  let fixture: ComponentFixture<AdminStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
