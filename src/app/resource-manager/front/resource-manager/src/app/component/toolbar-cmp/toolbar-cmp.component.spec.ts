import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarCmpComponent } from './toolbar-cmp.component';

describe('ToolbarCmpComponent', () => {
  let component: ToolbarCmpComponent;
  let fixture: ComponentFixture<ToolbarCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
