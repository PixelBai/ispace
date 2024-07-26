import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbarCmpComponent } from './taskbar-cmp.component';

describe('TaskbarCmpComponent', () => {
  let component: TaskbarCmpComponent;
  let fixture: ComponentFixture<TaskbarCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskbarCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskbarCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
