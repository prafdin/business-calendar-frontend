import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { PosterComponent } from './poster/poster.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventsListComponent } from './events-list/events-list.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AnnouncementsComponent,
        PosterComponent,
        EventCardComponent,
        EventsListComponent,
        ToolbarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSelectModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
