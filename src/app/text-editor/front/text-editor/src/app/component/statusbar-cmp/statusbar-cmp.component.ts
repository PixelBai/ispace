import { Component, Input } from '@angular/core';
import * as ace from 'ace-builds';   
import { EditorCmpComponent } from '../editor-cmp/editor-cmp.component';

@Component({
  selector: 'app-statusbar-cmp',
  standalone: true,
  imports: [],
  templateUrl: './statusbar-cmp.component.html',
  styleUrl: './statusbar-cmp.component.sass'
})
export class StatusbarCmpComponent {

  @Input() editorApi!: EditorCmpComponent;

  constructor() { }

}
