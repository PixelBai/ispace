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
 
    this.loadModule();
    
    // Create Ace Editor instance
    this.editor = ace.edit(this.editorContainer.nativeElement);
    
    // Set editor options
     this.editor.setTheme('ace/theme/chrome'); 
    
    // Optional: Set default content
    this.editor.setValue('');
  }


  loadModule() {  
    ace.config.setModuleUrl('ace/theme/chrome', ace.require('file-loader?esModule=false!./src-noconflict/theme-chrome.js'));
    ace.config.setModuleUrl('ace/theme/monokai', ace.require('file-loader?esModule=false!./src-noconflict/theme-monokai.js'));
  }


} 