import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';   
import * as ace from 'ace-builds';   
import { FileSvcService } from '../../svc/file-svc.service';

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

  constructor(public fileSvc:FileSvcService) { }

  ngAfterViewInit(): void {
    this.initEditor();

    // step 1: 监听内容更新数据
    this.fileSvc.content.subscribe((s)=>{
      this.editor?.setValue(s);
    });

  }

  save() { 
  
    // step 1: 获取当前内容
    let content = this.editor?.getValue()??"";
    
    // step 2: 保存当前内容到文件
     this.fileSvc.save(content).then((s)=>{

      if(s[0]){
        // step 3: 保存成功 
      }else{
        // step 4: 保存失败 
      }
     });
  
  }


  initEditor(): void { 
 
    this.loadModule();
    
    // Create Ace Editor instance
    this.editor = ace.edit(this.editorContainer.nativeElement);
    
    // Set editor options
    ace.config.setModuleUrl('ace/theme/chrome', ace.require('file-loader?esModule=false!./src-noconflict/theme-chrome.js'));
    ace.config.setModuleUrl('ace/theme/monokai', ace.require('file-loader?esModule=false!./src-noconflict/theme-monokai.js'));
     this.editor.setTheme('ace/theme/chrome'); 
    
    // Optional: Set default content
    this.editor.setValue('');
  }


  loadModule() {  
    ace.config.setModuleUrl('ace/theme/chrome', ace.require('file-loader?esModule=false!./src-noconflict/theme-chrome.js'));
    ace.config.setModuleUrl('ace/theme/monokai', ace.require('file-loader?esModule=false!./src-noconflict/theme-monokai.js'));
  }


} 