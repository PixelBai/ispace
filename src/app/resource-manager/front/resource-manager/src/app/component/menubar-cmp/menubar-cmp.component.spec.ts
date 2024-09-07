import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubarCmpComponent } from './menubar-cmp.component';

describe('MenubarCmpComponent', () => {
  let component: MenubarCmpComponent;
  let fixture: ComponentFixture<MenubarCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenubarCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenubarCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
