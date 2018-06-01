import { HttpClient } from '@angular/common/http';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable, BehaviorSubject, of as observableOf } from 'rxjs';
import { share, map, tap } from 'rxjs/operators';
import { TopicService } from '../topic.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-image-picker-overlay',
  templateUrl: './image-picker-overlay.component.html',
  styleUrls: ['./image-picker-overlay.component.scss']
})
export class ImagePickerOverlayComponent implements OnInit {
  @HostBinding('class.mat-elevation-z2') elevation = true;
  imageUrls: string[][];

  constructor(
    private topicService: TopicService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {
    this.loadAll();
  }

  showCopyMsg(fileName: string) {
    this.snackBar.open(`Copied image ${fileName} to clipborad!`);
  }

  loadAll() {
    this.http.get('http://in-a-nutshell-api.norizon.li/assets.php').pipe(
      map((data: string[]) => data.map(d => [`http://in-a-nutshell-api.norizon.li/assets/${d}`, d])),
      tap(urls => this.imageUrls = urls),
    ).subscribe();
  }

  uploadFile(event) {
    const files = Array.from(event.target.files);

    files.reduce<Observable<any>>((seq: Observable<any>, file) => seq
      .mergeMap(() => this.topicService.uploadFile(file)), observableOf(true))
      .subscribe(() => this.loadAll(), e => alert('An error occured ' + e));
  }

  ngOnInit() {
  }

}
