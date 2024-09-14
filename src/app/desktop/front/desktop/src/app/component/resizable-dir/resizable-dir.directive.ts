import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

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

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('resize-handle')) {
      this.isResizing = true;
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.startWidth = this.el.nativeElement.offsetWidth;
      this.startHeight = this.el.nativeElement.offsetHeight;

      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove = (event: MouseEvent): void => {
    if (!this.isResizing) return;

    const dx = event.clientX - this.startX!;
    const dy = event.clientY - this.startY!;

    const newWidth = this.startWidth! + dx;
    const newHeight = this.startHeight! + dy;

    this.renderer.setStyle(this.el.nativeElement, 'width', `${newWidth}px`);
    this.renderer.setStyle(this.el.nativeElement, 'height', `${newHeight}px`);
  }

  @HostListener('window:mouseup')
  onMouseUp = (): void => {
    this.isResizing = false;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
}
