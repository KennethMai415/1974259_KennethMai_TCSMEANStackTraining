import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TrackerComponent } from './tracker/tracker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { TaskHandlerService } from './task-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    TrackerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [TaskHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
