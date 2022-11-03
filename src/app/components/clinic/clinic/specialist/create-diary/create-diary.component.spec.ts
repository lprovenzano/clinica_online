import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiaryComponent } from './create-diary.component';

describe('CreateDiaryComponent', () => {
  let component: CreateDiaryComponent;
  let fixture: ComponentFixture<CreateDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDiaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
