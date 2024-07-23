import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopItemCmpComponent } from './desktop-item-cmp.component';

describe('DesktopItemCmpComponent', () => {
  let component: DesktopItemCmpComponent;
  let fixture: ComponentFixture<DesktopItemCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopItemCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopItemCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
