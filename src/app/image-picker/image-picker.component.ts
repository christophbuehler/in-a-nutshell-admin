import { tap } from 'rxjs/operators';
import { OverlayConfig, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { CdkPortal, TemplatePortal, Portal } from '@angular/cdk/portal';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('imagesTemplatePortal', { read: CdkPortal }) imagesTemplatePortal: Portal<any>;

  constructor(
    private overlay: Overlay,
    private elRef: ElementRef,
  ) { }

  private overlayRef: OverlayRef;

  ngOnInit() {
  }

  show() {
    const positionStrategy = this.overlay
        .position()
        .connectedTo(
          this.elRef,
          { originX: 'start', originY: 'top' },
          { overlayX: 'start', overlayY: 'top' }
        );

  const config = new OverlayConfig({
    hasBackdrop: true,
    backdropClass: 'cdk-overlay-transparent-backdrop',
    positionStrategy,
  });

  this.overlayRef = this.overlay.create(config);
  this.overlayRef.attach(this.imagesTemplatePortal);
  this.overlayRef
    .backdropClick()
    .pipe(
      tap(() => this.overlayRef.detach())
    ).subscribe();
  }
}
