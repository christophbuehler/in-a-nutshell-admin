import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule, MatToolbarModule, MatSidenavModule, MatTreeModule, MatIconModule, MatButtonModule, MatSnackBarModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ClipboardModule } from 'ngx-clipboard';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TopicDatabase } from './topic-database';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { ImagePickerOverlayComponent } from './image-picker/image-picker-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    ImagePickerComponent,
    ImagePickerOverlayComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    OverlayModule,
    ClipboardModule,
    PortalModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
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
