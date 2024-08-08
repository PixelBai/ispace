import { Component } from '@angular/core';
import { ToolbarCmpComponent } from "../../component/toolbar-cmp/toolbar-cmp.component";
import { EditorCmpComponent } from "../../component/editor-cmp/editor-cmp.component";
import { StatusbarCmpComponent } from "../../component/statusbar-cmp/statusbar-cmp.component"; 

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ToolbarCmpComponent, EditorCmpComponent, StatusbarCmpComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.sass'
})
export class HomePageComponent {

  


}
