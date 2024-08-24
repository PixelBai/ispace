import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowContainerCmpComponent } from './window-container-cmp.component';

describe('WindowContainerComponent', () => {
  let component: WindowContainerCmpComponent;
  let fixture: ComponentFixture<WindowContainerCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowContainerCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindowContainerCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
