import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCmpComponent } from './editor-cmp.component';

describe('EditorCmpComponent', () => {
  let component: EditorCmpComponent;
  let fixture: ComponentFixture<EditorCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorCmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
