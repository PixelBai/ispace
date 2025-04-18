import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCmpComponent } from './sidebar-cmp.component';

describe('SidebarCmpComponent', () => {
  let component: SidebarCmpComponent;
  let fixture: ComponentFixture<SidebarCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
