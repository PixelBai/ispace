import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbarMiniToolCmpComponent } from './taskbar-mini-tool-cmp.component';

describe('TaskbarMiniToolCmpComponent', () => {
  let component: TaskbarMiniToolCmpComponent;
  let fixture: ComponentFixture<TaskbarMiniToolCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskbarMiniToolCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskbarMiniToolCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
