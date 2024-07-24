import { fileInfoBaseDto } from "ispace.core.main/dist/dto/fileInfoBaseDto";

 
export class DesktopItemDto { 
    id!: string;
    type!:"file"|"folder";
    path!: string;
    iconUrl!: string; 
    desc?: string;
    name!: string;
    data!: fileInfoBaseDto; 
    position!: {x:number,y:number};
}