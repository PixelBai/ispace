import { Component, ElementRef, ViewChild } from '@angular/core';
import { DesktopItemDto } from '../desktop-item-cmp/desktop-item-dto';
import { file, folder } from 'ispace.core.main';
import { fileInfoBaseDto } from 'ispace.core.main/dist/dto/fileInfoBaseDto';
import { DesktopItemCmpComponent } from '../desktop-item-cmp/desktop-item-cmp.component';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { isRangesIntersection } from '../../common/utils/numberUtil';
import { WindowContainerCmpComponent } from "../window-container-cmp/window-container-cmp.component"; 

@Component({
  selector: 'app-desktop-cmp',
  standalone: true,
  imports: [DesktopItemCmpComponent, CommonModule, CdkDrag, WindowContainerCmpComponent],
  templateUrl: './desktop-cmp.component.html',
  styleUrl: './desktop-cmp.component.sass'
})
export class DesktopCmpComponent {
  onDragEnded(event: CdkDragEnd<any>, item: DesktopItemDto) {
    item.position = event.source.getFreeDragPosition();
  }

  basePath = "Desktop"
  positionPath = "/.ispace/desktopitem_position.json"

  desktopItems: DesktopItemDto[] = [];

  positions: { [key: string]: { x: number, y: number } } = {};

  @ViewChild("body", { static: false }) body!: ElementRef;
  ngOnInit() {
    this.init();
  }

  init() {
    this.load();
  }


  update_position() {

    let ps: { [key: string]: { x: number, y: number } } = {};
    this.desktopItems.forEach(s => {
      ps[s.id] = s.position;
    });
    if (Object.keys(ps).length <= 0) {
      return;
    }

    let content = JSON.stringify(ps);

    file.write(this.basePath + this.positionPath, content)
      .subscribe(
        s => {
          console.log(s)
        }, e => { 
          console.error(e)
        });

  }

  load() {
    // 加载桌面文件、文件夹数据；
    this.load_children().then((s) => { 
      if (s) {
        // 加载桌面项位置信息
        return this.load_position();
      }
      return Promise.resolve(false);
    }).then((s) => {
      if (s) {
        // 构建桌面项，生成桌面项列表
        return this.rendering();
      }
    });
  }

  load_children(): Promise<boolean> {
    // 加载桌面文件、文件夹数据
    return new Promise<boolean>((resolve) => {
      folder.children(this.basePath)
        .subscribe(
          (s) => {
            s.forEach((info) => {
              this.desktopItems.push(this.convertInfo(info));
            })
            resolve(true);
          },
          (e) => {
            console.log(e);
            resolve(false);
          }
        )
    })

  }

  load_position(): Promise<boolean> {
    // 加载桌面项位置信息
    return new Promise<boolean>((resolve) => {
      // 获取 basePath + .position 文件,内容信息
      file.content(this.basePath + this.positionPath)
        .subscribe((s) => {
          // 保存到当前变量
          if (s?.length > 0) {
            try{
            this.positions = JSON.parse(s);
            }catch(e){
              console.error(e);
            }
            if (Object.keys(this.positions).length <= 0) {
              this.positions = this.init_position();
            }
          }
          else {
            this.positions = this.init_position();
          }
          resolve(true);
        }, (e) => { 
          if (e?.header?.stat == 404001) {
          this.init_postion_file().then(s => {
            this.init_position();
            resolve(true);
            return;
          })

        }
        else {

          console.log(e);
            resolve(false); 
        }
        })
    })
  } 
  init_postion_file(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      file.create(this.basePath + "/.ispace", "desktopitem_position.json").subscribe((s) => {
        resolve(true);
      }, (e) => {
        console.log(e);
        resolve(false);
      })
  });

  }

  rendering() {
    // check
    if (this.desktopItems.length <= 0) {
      return;
    }
    if (Object.keys(this.positions).length <= 0) {
      return;
    }

    // step core:
    let waitInitItems: DesktopItemDto[] = [];
    this.desktopItems.forEach((item) => {
      if (this.positions[item.id]) {
        item.position = this.positions[item.id];
      }
      else {
        waitInitItems.push(item); 
      }
    })

    waitInitItems.forEach((item) => {
      this.initNewPosition(item);
    })

    setInterval(() => { this.update_position(); }, 1000 * 1);
  }
   initNewPosition(item: DesktopItemDto)  {

    // step init:
    let bodyHeight = this.body.nativeElement.clientHeight;
    let itemHeight = 100;
    let itemWidth = 100;
    let indexPosition = { x: 0, y: 0 }; 


    // step 1: 从position (0,0),顺序位置，并校验，不重合则init当前位置
    while (true) {

      // step 1.1: check 重合
      let isOverlap = false;
      for (let i = 0; i < this.desktopItems.length; i++) {
        let s = this.desktopItems[i];
        if(s.position == undefined)
          {
            continue;
          }
 
          // x check
          let isOverlapX = isRangesIntersection(indexPosition.x, indexPosition.x + itemWidth, s.position.x, s.position.x + itemWidth, false);
          // y check
          let isOverlapY = isRangesIntersection(indexPosition.y, indexPosition.y + itemWidth, s.position.y, s.position.y + itemWidth,false);

          isOverlap = isOverlapX! && isOverlapY!;
          if (isOverlap) { 
            break;
          } 
      }
      if (isOverlap) {
        // step : 根据当前项的高度，计算下一个项的位置 
        if (indexPosition.y + itemHeight * 2 > bodyHeight) {
          indexPosition.y = 0;
          indexPosition.x = indexPosition.x + itemWidth;
        }
        else {
          indexPosition.y = indexPosition.y + itemHeight;
        } 
        continue;
      }
      debugger;
      item.position = indexPosition;
      break;
        
    }

    return
  }


  convertInfo(info: fileInfoBaseDto): DesktopItemDto {
    let result = new DesktopItemDto();
    result.id = info.id!;
    result.path = this.basePath + "/" + info.name;
    result.name = info.name ?? (info.isDir ? "未命名文件夹" : "未命名文件");
    result.data = info;
    result.type = info.isDir ? "folder" : "file";
    result.iconUrl = info.isDir ? "images/folder.png" : "images/file.png";
    return result;
  }

  init_position(): { [key: string]: { x: number; y: number; }; } {
    // check:
    if (this.desktopItems.length <= 0) {
      return this.positions;
    }

    // step: init 获取当前bodydiv的可视高度、宽度
    let bodyHeight = this.body.nativeElement.clientHeight;

    // 单个所占宽高
    let itemHeight = 100;
    let itemWidth = 100;

    // core : 
    let indexPosition = { x: 0, y: 0 };
    this.desktopItems.forEach((item) => {
      this.positions[item.id] = { x: indexPosition.x, y: indexPosition.y };

      // step : 根据当前项的高度，计算下一个项的位置 
      if (indexPosition.y + itemHeight * 2 > bodyHeight) {
        indexPosition.y = 0;
        indexPosition.x = indexPosition.x + itemWidth;
      }
      else {
        indexPosition.y = indexPosition.y + itemHeight;
      }
    })

    return this.positions;
  }

} 
