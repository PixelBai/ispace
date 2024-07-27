import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {common} from 'ispace.core.main';

@Component({
  selector: 'app-taskbar-mini-tool-cmp',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './taskbar-mini-tool-cmp.component.html',
  styleUrl: './taskbar-mini-tool-cmp.component.sass'
})
export class TaskbarMiniToolCmpComponent {

  initDateTime = new Date();

  datetime!: Date ;

  constructor() { }

  ngOnInit() {

    // step init:
    this.getServerTime().then((s) => {
      this.datetime = s;
      setInterval(() => {
        this.datetime.setSeconds(this.datetime.getSeconds() + 1);
      }, 1000);

    });
    } 

  getServerTime():Promise<Date>{ { 
    return  new Promise<Date>((resolve) => {
      common.getDateTime().subscribe(
        (s) => { 
          if(s.success){
            resolve(s.data!);
            return;
          }
          resolve(this.initDateTime);
        },
        e=>{
          console.log(e);
          resolve(this.initDateTime);
        }
      )
    })
  }




}
}
