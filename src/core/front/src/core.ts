import { authRequest } from "./authRequest";
import { commonRequest } from "./commonRequest";
import { config } from "./config";
import { fileInfoBaseDto } from "./dto/fileInfoBaseDto";
import { fileInfoDto } from "./dto/fileInfoDto";
import { folderInfoDto } from "./dto/folderInfoDto";
import { resultDto } from "./dto/resultDto";
import { wsRequestDto } from "./dto/wsRequestDto";
import { wsResponseDto } from "./dto/wsResponseDto";
import { fileHandler } from "./fileHandler";
import { folderHandler } from "./folderHandler"; 
 
let cfg: config = {
    defaultWebSocketUrl: "/ws/default"
}

export let gv={
    token : "",
    info:1,
    cfg, 
}

export let file = new fileHandler();

export let folder = new folderHandler();

export let auth = new authRequest();

export let common = new commonRequest();
 

export * from "./dto/fileInfoBaseDto";
export * from "./dto/fileInfoDto";
export * from "./dto/folderInfoDto";
export * from "./dto/resultDto";
export * from "./dto/wsRequestDto";
export * from "./dto/wsResponseDto";