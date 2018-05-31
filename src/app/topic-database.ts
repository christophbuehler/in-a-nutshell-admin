import { Topic, TopicService } from './topic.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators';

@Injectable()
export class TopicDatabase {
  dataChange = new BehaviorSubject<OrderedTopic[]>([]);

  get data(): OrderedTopic[] { return this.dataChange.value; }

  constructor(
    topic: TopicService,
  ) {
    topic.topics.pipe(
      tap(d => console.log("data change", d)),
      tap(t => this.initialize(t)),
    ).subscribe();
  }

  initialize(topics: Topic[]) {
    const structure = topics
      .filter(t => t.path === '')
      .map(t => (<OrderedTopic>{
        ...t,
        children: this.orderedSubTopics(topics, t),
      }));

    this.dataChange.next(structure);
  }

  orderedSubTopics(topics: Topic[], topic: Topic): OrderedTopic[] {
    const path = trimSlashes(`${topic.path}/${topic.title.toLocaleLowerCase().replace(/ /g, '-')}`);
    const filtered = topics
        .filter(t => t.path.replace(/^\/|\/$/g, '') === path);
    return filtered
      .map(t => (<OrderedTopic> {
        ...t,
        children: this.orderedSubTopics(topics, t),
      }));
    function trimSlashes(str) {
        return str
            .replace(/\/\//g, '/')
            .replace(/^\/|\/$/g, '');
    }
  }
}

export interface OrderedTopic extends Topic {
  children: OrderedTopic[];
}
