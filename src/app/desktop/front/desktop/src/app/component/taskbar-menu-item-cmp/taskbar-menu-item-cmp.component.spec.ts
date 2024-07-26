import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbarMenuItemCmpComponent } from './taskbar-menu-item-cmp.component';

describe('TaskbarMenuItemCmpComponent', () => {
  let component: TaskbarMenuItemCmpComponent;
  let fixture: ComponentFixture<TaskbarMenuItemCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskbarMenuItemCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskbarMenuItemCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
