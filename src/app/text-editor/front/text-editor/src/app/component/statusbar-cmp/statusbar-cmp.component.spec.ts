import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusbarCmpComponent } from './statusbar-cmp.component';

describe('StatusbarCmpComponent', () => {
  let component: StatusbarCmpComponent;
  let fixture: ComponentFixture<StatusbarCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusbarCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusbarCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
