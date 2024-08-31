import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { common } from 'ispace.core.main';

@Component({
  selector: 'app-taskbar-mini-tool-cmp',
  standalone: true,
  imports: [MatIconModule, CdkMenuModule,CommonModule],
  templateUrl: './taskbar-mini-tool-cmp.component.html',
  styleUrl: './taskbar-mini-tool-cmp.component.sass'
})
export class TaskbarMiniToolCmpComponent {

  si: any;

  initDateTime = new Date();

  datetime!: Date;

  getDate(): string {
    return this.datetime.getDate().toString();
  }

  data?: string;

  time?: string;

  constructor() { }

  ngOnInit() {
    this.syncTime();
  }

  syncTime() {

    this.getServerTime().then((s) => {
      this.datetime = new Date(s);
      this.dealWithDatetime();
      if (this.si) {
        clearInterval(this.si);
        this.si = null;
      }
      this.si = setInterval(() => {
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

  getServerTime(): Promise<Date> {
    {
      return new Promise<Date>((resolve) => {
        common.getDateTime().subscribe(
          (s) => {
            if (s.success) {
              resolve(s.data!);
              return;
            }
            resolve(this.initDateTime);
          },
          e => {
            console.log(e);
            resolve(this.initDateTime);
          }
        )
      })
    }

  }
}
