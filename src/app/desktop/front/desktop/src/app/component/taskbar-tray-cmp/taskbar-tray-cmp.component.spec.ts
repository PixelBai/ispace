import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbarTrayCmpComponent } from './taskbar-tray-cmp.component';

describe('TaskbarTrayCmpComponent', () => {
  let component: TaskbarTrayCmpComponent;
  let fixture: ComponentFixture<TaskbarTrayCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskbarTrayCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskbarTrayCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
