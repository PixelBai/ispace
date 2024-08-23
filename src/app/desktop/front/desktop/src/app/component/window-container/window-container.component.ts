import { Component } from '@angular/core';
import { WindowCmpComponent } from '../window-cmp/window-cmp.component';
import { WindowsManagerService } from '../../service/windows-manager.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-window-container',
  standalone: true,
  imports: [CommonModule, WindowCmpComponent],
  templateUrl: './window-container.component.html',
  styleUrl: './window-container.component.sass'
})
export class WindowContainerComponent {  

  constructor(public wsm: WindowsManagerService) {





   }

}
