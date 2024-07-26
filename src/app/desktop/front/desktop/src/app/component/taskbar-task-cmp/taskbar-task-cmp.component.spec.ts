import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbarTaskCmpComponent } from './taskbar-task-cmp.component';

describe('TaskbarTaskCmpComponent', () => {
  let component: TaskbarTaskCmpComponent;
  let fixture: ComponentFixture<TaskbarTaskCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskbarTaskCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskbarTaskCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
