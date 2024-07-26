import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundCmpComponent } from './background-cmp.component';

describe('BackgroundCmpComponent', () => {
  let component: BackgroundCmpComponent;
  let fixture: ComponentFixture<BackgroundCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
