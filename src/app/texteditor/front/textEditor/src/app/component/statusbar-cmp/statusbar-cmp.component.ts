import { Component, Input } from '@angular/core';
import * as ace from 'ace-builds';   

@Component({
  selector: 'app-statusbar-cmp',
  standalone: true,
  imports: [],
  templateUrl: './statusbar-cmp.component.html',
  styleUrl: './statusbar-cmp.component.sass'
})
export class StatusbarCmpComponent {

  @Input() editorApi?: ace.Ace.Editor;

  constructor() { }

}
