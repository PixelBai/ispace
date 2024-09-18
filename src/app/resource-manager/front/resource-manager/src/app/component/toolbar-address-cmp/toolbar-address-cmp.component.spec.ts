import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarAddressCmpComponent } from './toolbar-address-cmp.component';

describe('ToolbarAddressCmpComponent', () => {
  let component: ToolbarAddressCmpComponent;
  let fixture: ComponentFixture<ToolbarAddressCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarAddressCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarAddressCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
