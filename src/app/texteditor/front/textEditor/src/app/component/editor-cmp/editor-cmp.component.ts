import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';   
import * as ace from 'ace-builds'; 

@Component({
  selector: 'app-editor-cmp',
  standalone: true,
  imports: [],
  templateUrl: './editor-cmp.component.html',
  styleUrl: './editor-cmp.component.sass'
})
export class EditorCmpComponent {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;

  editor?: ace.Ace.Editor;

  ngAfterViewInit(): void {
    this.initEditor();
  }

  initEditor(): void {
    ace.require("ace/ext/language_tools");
    // Create Ace Editor instance
    this.editor = ace.edit(this.editorContainer.nativeElement);
    
    // Set editor options
    // this.editor.setTheme('ace/theme/monokai');
    // this.editor.session.setMode('ace/mode/javascript');
    
    // Optional: Set default content
    this.editor.setValue('// Write your code here...');
  }

} 