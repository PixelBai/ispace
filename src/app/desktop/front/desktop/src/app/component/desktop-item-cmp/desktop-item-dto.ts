 
export class DesktopItemDto {
    type!:"file"|"folder";
    path!: string;
    iconUrl!: string; 
    desc?: string;
    name!: string;
}