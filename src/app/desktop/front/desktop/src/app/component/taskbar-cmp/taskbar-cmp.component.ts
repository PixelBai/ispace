import { Component } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TaskbarMiniToolCmpComponent } from "../taskbar-mini-tool-cmp/taskbar-mini-tool-cmp.component";
import { TaskbarTrayCmpComponent } from "../taskbar-tray-cmp/taskbar-tray-cmp.component";
import { BackgroundCmpComponent } from "../background-cmp/background-cmp.component";
import { TaskbarTaskCmpComponent } from "../taskbar-task-cmp/taskbar-task-cmp.component";
import { TaskbarMenuCmpComponent } from "../taskbar-menu-cmp/taskbar-menu-cmp.component";

@Component({
  selector: 'app-taskbar-cmp',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, TaskbarMiniToolCmpComponent, TaskbarTrayCmpComponent, BackgroundCmpComponent, TaskbarTaskCmpComponent, TaskbarMenuCmpComponent],
  templateUrl: './taskbar-cmp.component.html',
  styleUrl: './taskbar-cmp.component.sass'
})
export class TaskbarCmpComponent {

}
