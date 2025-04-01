import { Injectable } from '@angular/core';

import { configOptionDto, DriverDto, DriverEngine, DriverOperationDto, modeDto, ruleDriverRelationDto } from 'ispace_de'
import { WindowsManagerService } from './windows-manager.service';
@Injectable({
  providedIn: 'root'
})
export class DriveEnginService {

  public driveEngine!: DriverEngine;

  constructor(private windowManager: WindowsManagerService) {
     
    this.driveEngine = DriverEngine.init();

    // step 1: 配置驱动
    let opt:configOptionDto = new configOptionDto(); 
    
    // 配置
    opt.cfg = new configOptionDto(); 

    // 模式
    opt.modes = [];
    let mode = new modeDto();
    mode.id = 1;
    mode.name = "资源管理器";
    mode.main = (url)=>{  this.windowManager.open("资源管理器",url); };
    opt.modes.push(mode);
    let mode2 = new modeDto();
    mode2.id = 2;
    mode2.name = "属性";
    mode2.main = (url)=>{  this.windowManager.open("属性",url); };
    opt.modes.push(mode2);

    let mode3 = new modeDto();
    mode3.id = 3;
    mode3.name = "文本编辑器";
    mode3.main = (url)=>{  this.windowManager.open("文本编辑器",url); };
    opt.modes.push(mode3);


    // 驱动
    opt.drivers = [];
    let driver = new DriverDto();
    driver.id = 1;
    driver.name = "资源管理器";
    driver.operation = []; 
    // 驱动-操作： 资源管理器打开
      let operation = new DriverOperationDto();
      operation.driverId = driver.id;
      operation.id = 1;
      operation.name = "资源管理器打开"; 
      operation.mode = 1;
      operation.entry = "/app/resource-manager/#/home?path=";
      driver.operation.push(operation);
    // 驱动-操作： 资源管理器打开
      let operation1 = new DriverOperationDto();
      operation1.driverId = driver.id;
      operation1.id = 2;
      operation1.name = "属性"; 
      operation1.mode = 2;
      operation1.entry = "/app/resource-manager/#/property?path=";
      driver.operation.push(operation1);

    // 驱动-加入
    opt.drivers.push(driver); 
    // 映射
    opt.maps = [];
    let map = new ruleDriverRelationDto();
        map.rule = /.*/;
        map.isDir = true;
        map.driverId = 1;
        opt.maps.push(map);

    let map2 = new ruleDriverRelationDto();
        map2.rule = /.*/;
        map2.isDir = false;
        map2.driverId = 1;
    opt.maps.push(map2);
    



// **** txt文本编辑器配置 ****

    // 驱动
    let driver2 = new DriverDto();
    driver2.id = 3;
    driver2.name = "txt文本编辑器";
    driver2.fileIconUrl = "images/txt.png";
    driver2.operation = []; 
    // 驱动-操作： txt文本编辑器打开
      let operation2 = new DriverOperationDto();
      operation2.driverId = driver2.id;
      operation2.id = 1;
      operation2.name = "打开"; 
      operation2.mode = 3;
      operation2.entry = "/app/text-editor/#/home?path=";
      driver2.operation.push(operation2); 
    opt.drivers.push(driver2);
   // 映射
    let map3 = new ruleDriverRelationDto();
        map3.rule = /.*\.txt$/;
        map3.isDir = false;
        map3.driverId = 3;
    opt.maps.push(map3); 


/***** hyperlink  ****/

// http://127.0.0.1/app/hyperlink/index.html?address=

    // 模式
    let mode4 = new modeDto();
    mode4.id = 4;
    mode4.name = "超链接";
    mode4.main = (url)=>{ window.open(url, "_blank"); };
    opt.modes.push(mode4);

    // 驱动
    let driver3 = new DriverDto();
    driver3.id = 4;
    driver3.name = "hyperlink";
    driver3.fileIconUrl = "images/link.png";
    driver3.operation = []; 
    // 驱动-操作： hyperlink打开
      let operation3 = new DriverOperationDto();
      operation3.driverId = driver3.id;
      operation3.id = 1;
      operation3.name = "打开"; 
      operation3.mode = 4;
      operation3.entry = "/app/hyperlink/index.html?path=";
      driver3.operation.push(operation3); 
    opt.drivers.push(driver3);
   // 映射
    let map4 = new ruleDriverRelationDto();
        map4.rule = /.*\.link$/;
        map4.isDir = false;
        map4.driverId = 4;
    opt.maps.push(map4);
 
    // 配置
    this.driveEngine.config(opt);  
  }

  getOperations(fileName: string,isDir: boolean) :DriverOperationDto[]{
    return this.driveEngine.getOperations(fileName,isDir);
  }

  execute(driverId:number,operationId:number, path:string) { 
    this.driveEngine.execute(driverId,operationId, path); 
  }

}
