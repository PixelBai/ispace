import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowCmpComponent } from './window-cmp.component';

describe('WindowComponent', () => {
  let component: WindowCmpComponent;
  let fixture: ComponentFixture<WindowCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindowCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
