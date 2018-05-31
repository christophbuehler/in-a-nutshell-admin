import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule, MatToolbarModule, MatSidenavModule, MatTreeModule, MatIconModule, MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TopicDatabase } from './topic-database';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTreeModule,
    MatSidenavModule,
    MatToolbarModule,
    MarkdownModule.forRoot({}),
  ],
  providers: [TopicDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
