import { Point } from '@angular/cdk/drag-drop';
import { Directive, ElementRef, EventEmitter, HostListener, Input, input, numberAttribute, Output, Renderer2 } from '@angular/core';


export interface ResizableChagedDto {
  point: Point; 
  width: number;
  height: number;
}

@Directive({
  selector: '[appResizable]',
  standalone: true
})
export class ResizableDirective {

  isResizing = false;
  startX?: number;
  startY?: number;
  startWidth?: number;
  startHeight?: number;

  // 固定点位

  @Input() ResizableFixedPoint = { x: 0, y: 0 };
  FixedPoint = { x: 0, y: 0 };
  fixedPointType = ''; 
  
  @Input() ResizableDisabled: boolean = false; // 默认值为'yellow' 


  @Output() onResizableEnd = new EventEmitter();

  @Output() onResizableMove = new EventEmitter();

  @Output() onResizableStart = new EventEmitter<ResizableChagedDto>();

  constructor(private el: ElementRef<HTMLDivElement>, private renderer: Renderer2) { }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (this.ResizableDisabled) return;
    const target = event.target as HTMLElement;

    this.onResizableStart.emit(); 
    if (target.classList.contains('resize-handle')) { 
      this.isResizing = true;
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.startWidth = this.el.nativeElement.offsetWidth;
      this.startHeight = this.el.nativeElement.offsetHeight;
 
      // 固定点位
      var rect = this.el.nativeElement.getBoundingClientRect();
      this.fixedPointType = ''; 
      for (let i in target.classList) {
        let s = target.classList[i];
        if (s == 'top' || s == 'left' || s == 'top-left') {
          this.fixedPointType = s;
          break;
        }
        if (s == 'bottom' || s == 'right' || s == 'bottom-right') {
          this.fixedPointType = s;
          break;
        }
        if (s == 'top-right') {
          this.fixedPointType = s;
          break;
        }
        if (s == 'bottom-left') {
          this.fixedPointType = s;
          break;
        }
      }
      this.FixedPoint = { x: this.ResizableFixedPoint.x, y: this.ResizableFixedPoint.y }; 
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove = (event: MouseEvent): void => {
    
    if (!this.isResizing) return;

    const dx = event.clientX - this.startX!;
    const dy = event.clientY - this.startY!;
  
    this.reRenderer(dx, dy);
  }

  @HostListener('window:mouseup')
  onMouseUp = (): void => {
    this.isResizing = false;

    this.onResizableEnd.emit(); 
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
 

  reRenderer(dx: number, dy: number) {
    // step check:
    if (this.fixedPointType == '') return;
    // step init:
    let point: { x?: number; y?: number;} = { x: undefined, y: undefined };
    let height:number|undefined = undefined;
    let width:number|undefined = undefined;

    // step core:
    if (this.fixedPointType == 'top') {
      height = this.startHeight! - dy;
      point.y = this.FixedPoint.y + dy;
    }
    if (this.fixedPointType == 'bottom') {
      height = this.startHeight! + dy;
    }
    if (this.fixedPointType == 'left') {
      width = this.startWidth! - dx;
      point.x = this.FixedPoint.x + dx;
    }
    if (this.fixedPointType == 'right') {
      width = this.startWidth! + dx;
    }

    if (this.fixedPointType == 'top-left') {
      height = this.startHeight! - dy;
      width = this.startWidth! - dx;
      point.x = this.FixedPoint.x + dx;
      point.y = this.FixedPoint.y + dy;
    }
    if (this.fixedPointType == 'bottom-right') {
      height = this.startHeight! + dy;
      width = this.startWidth! + dx;
    }
    if (this.fixedPointType == 'bottom-left') {
      height = this.startHeight! + dy;
      width = this.startWidth! - dx;
      point.x = this.FixedPoint.x + dx;
    }
    if (this.fixedPointType == 'top-right') {
      height = this.startHeight! - dy;
      width = this.startWidth! + dx;
      point.y = this.FixedPoint.y + dy;
    }

    // step 4: render
    if(point.x == undefined)
      {
        point.x = this.FixedPoint.x;
      }
    if(point.y == undefined)
      { 
        point.y = this.FixedPoint.y;
      }
 
    if(width == undefined)
      {
        width  = this.startWidth;
      }
    if(height == undefined)
      {
        height = this.startHeight;
      }
      this.onResizableMove.emit({point, height, width}); 
  }
}
