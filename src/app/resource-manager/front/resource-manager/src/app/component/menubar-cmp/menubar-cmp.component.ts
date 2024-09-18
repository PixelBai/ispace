import { Component, Input } from '@angular/core';
import { FolderDetailsDto } from '../../dto/folderDetailsDto';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-menubar-cmp',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './menubar-cmp.component.html',
  styleUrl: './menubar-cmp.component.scss'
})
export class MenubarCmpComponent {

  @Input() folder?:FolderDetailsDto 
}
