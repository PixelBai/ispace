import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCmpComponent } from './content-cmp.component';

describe('ContentCmpComponent', () => {
  let component: ContentCmpComponent;
  let fixture: ComponentFixture<ContentCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
