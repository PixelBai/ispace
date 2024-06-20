 import { config } from "./config";
import { fileHandler } from "./fileHandler";
import { folderHandler } from "./folderHandler"; 
 
let cfg: config = {
    defaultWebSocketUrl: "/ws/default"
}

export let gv={
    token : "123asdasd",
    info:1,
    cfg, 
}

export let file = new fileHandler();

export let folder = new folderHandler();

 