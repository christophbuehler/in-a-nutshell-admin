import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, HostListener, HostBinding } from '@angular/core';
import { Observable, fromEvent, timer } from 'rxjs';
import { tap, filter, map, debounceTime } from 'rxjs/operators';
import { combineLatest, withLatestFrom } from 'rxjs/internal/operators';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
  @Input() image: Observable<HTMLImageElement>;
  @HostBinding('class.show') show = false;

  constructor(
    private elRef: ElementRef,
  ) { }

  ngOnInit() {
    const stylesFullBleed = {
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
    };

    const container: HTMLImageElement = this.container.nativeElement;
    const containerClick = fromEvent(container, 'click');
    const imageStyles = this.image.pipe(
      filter(img => Boolean(img)),
      map(img => img.getBoundingClientRect()),
      map((rect) => ({
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
      })),
    );

    imageStyles.pipe(
      tap(rect => Object.assign(container.style, rect)),
      tap(() => this.show = true),
      debounceTime(100),
      tap(() => Object.assign(container.style, stylesFullBleed)),
    ).subscribe();

    containerClick.pipe(
      withLatestFrom(imageStyles),
      tap(([ev, rect]) => Object.assign(container.style, rect)),
      debounceTime(400),
      tap(() => this.show = false),
    ).subscribe();
  }
}
