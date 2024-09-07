import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfobarCmpComponent } from './infobar-cmp.component';

describe('InfobarCmpComponent', () => {
  let component: InfobarCmpComponent;
  let fixture: ComponentFixture<InfobarCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfobarCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfobarCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
