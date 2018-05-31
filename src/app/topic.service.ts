import { map, tap, filter } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { RequestOptions, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  topics: Observable<Topic[]>;

  constructor(
    private http: HttpClient,
  ) {
    this.topics = this.topicsSubject.asObservable();
    this.getAll();
  }

  private topicsSubject = new BehaviorSubject<Topic[]>([]);

  addTopic(topic: Topic) {
    this.topicsSubject.next([
      ...this.topicsSubject.value.filter(t => t.id !== -1),
      topic,
    ]);
  }

  saveTopic(topic: Topic): Observable<number> {
    const data = <any>{
      title: topic.title,
      path: topic.path,
      body: topic.body,
    };
    return this.http.post(`http://in-a-nutshell-api.norizon.li?id=${topic.id}`, data, {
      responseType: 'text',
    }).pipe(
      map(id => topic.id === -1 ? parseInt(id, 10) : topic.id),
      tap(id => this.topicsSubject.next(this.topicsSubject.value
        .map(t => t.id === topic.id
          ? { ...topic, id }
          : t))),
    );
  }

  uploadFile(file): Observable<any> {
    const formData = new FormData();
    formData.append('fileToUpload', file, file.name);
    return this.http.post('http://in-a-nutshell-api.norizon.li/upload.php', formData, {
      responseType: 'text',
    });
  }

  deleteTopic(id: number): Observable<any> {
    return this.http.delete(`http://in-a-nutshell-api.norizon.li?id=${id}`, {
      responseType: 'text',
    }).pipe(
      tap(() => this.getAll()),
    );
  }

  private getAll() {
    this.http.get('http://in-a-nutshell-api.norizon.li').pipe(
      map((data: any[]) => data.map(d => ({ id: d.id, ...JSON.parse(d.document) }))),
      tap(topics => this.topicsSubject.next(topics)),
    ).subscribe();
  }
}

export interface Topic {
  id: number;
  title: string;
  body: string;
  path: string;
}
