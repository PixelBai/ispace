import { forwardRef } from "@angular/core";

export class pathDto{

    id:number = 0;

    path:string = "";

    isHistory:boolean = false;

    forwardRef?:pathDto;

    backRef?:pathDto;
}