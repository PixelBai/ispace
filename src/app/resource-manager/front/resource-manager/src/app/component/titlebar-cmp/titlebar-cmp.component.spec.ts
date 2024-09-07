import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlebarCmpComponent } from './titlebar-cmp.component';

describe('TitlebarCmpComponent', () => {
  let component: TitlebarCmpComponent;
  let fixture: ComponentFixture<TitlebarCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitlebarCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitlebarCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
