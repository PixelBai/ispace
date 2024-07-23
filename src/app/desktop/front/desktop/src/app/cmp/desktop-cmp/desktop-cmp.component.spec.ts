import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopCmpComponent } from './desktop-cmp.component';

describe('DesktopCmpComponent', () => {
  let component: DesktopCmpComponent;
  let fixture: ComponentFixture<DesktopCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
