import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarAddressCmpComponent } from "../toolbar-address-cmp/toolbar-address-cmp.component";
import { CoreService } from '../../service/core.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toolbar-cmp',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatDividerModule, ToolbarAddressCmpComponent,FormsModule],
  templateUrl: './toolbar-cmp.component.html',
  styleUrl: './toolbar-cmp.component.scss'
})
export class ToolbarCmpComponent {

 constructor(public coreSvc:CoreService) { 

 }

// 查询模块 //
query: string = "";
search() {
  this.coreSvc.setQuery(this.query);
}
}
