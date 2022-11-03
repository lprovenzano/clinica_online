import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistManagerComponent } from './specialist-manager.component';

describe('SpecialistManagerComponent', () => {
  let component: SpecialistManagerComponent;
  let fixture: ComponentFixture<SpecialistManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialistManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialistManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
