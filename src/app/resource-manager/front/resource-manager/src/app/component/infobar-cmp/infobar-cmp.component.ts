import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CoreService } from '../../service/core.service';

@Component({
  selector: 'app-infobar-cmp',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './infobar-cmp.component.html',
  styleUrl: './infobar-cmp.component.scss'
})
export class InfobarCmpComponent {

  msg:string = "";

  constructor(private coreSvc:CoreService) 
  {
    this.coreSvc.msg.subscribe(s => {
      this.msg = s
    })
  }

}
