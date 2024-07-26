import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbarMenuCmpComponent } from './taskbar-menu-cmp.component';

describe('TaskbarMenuCmpComponent', () => {
  let component: TaskbarMenuCmpComponent;
  let fixture: ComponentFixture<TaskbarMenuCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskbarMenuCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskbarMenuCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
