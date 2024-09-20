import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesCmpComponent } from './properties-cmp.component';

describe('PropertiesCmpComponent', () => {
  let component: PropertiesCmpComponent;
  let fixture: ComponentFixture<PropertiesCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
