import { Component, HostListener } from '@angular/core';
import { CoreService } from '../../service/core.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toolbar-address-cmp',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './toolbar-address-cmp.component.html',
  styleUrl: './toolbar-address-cmp.component.scss'
})
export class ToolbarAddressCmpComponent {
 
  address = "";

  constructor(public coreSvc:CoreService) { 
    coreSvc.path.subscribe(s => {
      if(s.path == this.address) {
        return;
      }
      this.address = s.path;
    })
  }

  // 添加当前组件回车事件
  @HostListener('keydown.enter', ['$event'])
  enter(event: KeyboardEvent) {
    if(this.address == this.coreSvc.path.value.path) {
      return;
    }
  
    this.coreSvc.setPath(this.address);
  }

  // 添加当前组件焦点离开事件
  @HostListener('blur', ['$event'])
  blur(event: KeyboardEvent) {
    this.address = this.coreSvc.path.value.path;
  }
  
  
}
