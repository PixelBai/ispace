import { Component, Input } from '@angular/core';
import { FolderDetailsDto } from '../../dto/folderDetailsDto';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { auth } from 'ispace.core.main';

@Component({
  selector: 'app-menubar-cmp',
  standalone: true,
  imports: [MatButtonModule,MatMenuModule],
  templateUrl: './menubar-cmp.component.html',
  styleUrl: './menubar-cmp.component.scss'
})
export class MenubarCmpComponent {
  logout() {
    auth.logout();
    window.location.reload();
  }

  @Input() folder?:FolderDetailsDto 
}
