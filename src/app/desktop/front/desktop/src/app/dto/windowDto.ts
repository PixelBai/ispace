import { Point } from "@angular/cdk/drag-drop";

export class WindowDto {
    id: number = 0;
    title: string = "";
    url: string = "";
    width: string = "0";
    height: string = "0";
    left: number = 0;
    top: number = 0;
    zIndex: number = 0;
    position: Point = { x: 0, y: 0 };
}