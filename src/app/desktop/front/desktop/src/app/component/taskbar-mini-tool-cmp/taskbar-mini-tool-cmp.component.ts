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

  getDate():string{
    return this.datetime.getDate().toString();
  }

  data?:string;

  time?:string;

  constructor() { }

  ngOnInit() {

    // step init:
    this.getServerTime().then((s) => {
      this.datetime = s;
      this.dealWithDatetime();
      setInterval(() => {
        this.datetime.setSeconds(this.datetime.getSeconds() + 1);

        this.dealWithDatetime();
      }, 1000);

    });
    } 
  dealWithDatetime() {
    let date = this.datetime;
    let year = date.getFullYear();  
    let month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的  
    let day = String(date.getDate()).padStart(2, '0');  
    let hours = String(date.getHours()).padStart(2, '0');  
    let minutes = String(date.getMinutes()).padStart(2, '0');  
    let seconds = String(date.getSeconds()).padStart(2, '0');  
  
    this.data = `${year}-${month}-${day}`;
    this.time = `${hours}:${minutes}:${seconds}`; 
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
