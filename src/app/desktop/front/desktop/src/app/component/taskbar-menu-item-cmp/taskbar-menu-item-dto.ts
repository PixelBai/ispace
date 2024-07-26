
import { fileInfoBaseDto } from "ispace.core.main/dist/dto/fileInfoBaseDto";

 
export class TaskbarMenuItemDto { 
    id!: string;
    type!:"file"|"folder";
    path!: string;
    iconUrl!: string; 
    desc?: string;
    name!: string;
    data!: fileInfoBaseDto; 
}