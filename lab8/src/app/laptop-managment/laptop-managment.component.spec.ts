import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopManagmentComponent } from './laptop-managment.component';

describe('LaptopManagmentComponent', () => {
  let component: LaptopManagmentComponent;
  let fixture: ComponentFixture<LaptopManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaptopManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaptopManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
