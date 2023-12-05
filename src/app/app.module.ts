import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AnnouncementsComponent} from './announcements/announcements.component';
import {PosterComponent} from './poster/poster.component';
import {EventCardComponent} from './event-card/event-card.component';
import {EventsListComponent} from './events-list/events-list.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {FooterComponent} from "./footer/footer.component";
import {HttpClientModule} from "@angular/common/http";
import {DetailedCardComponent} from "./detailed-card/detailed-card.component";
import {HomePageComponent} from "./home-page/home-page.component";
import { RegisterEventPopupComponent } from './register-event-popup/register-event-popup.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthUserPopupComponent } from "./login-user-popup/auth-user-popup.component";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AnnouncementsComponent,
        PosterComponent,
        EventCardComponent,
        EventsListComponent,
        ToolbarComponent,
        DetailedCardComponent,
        HomePageComponent,
        FooterComponent,
        RegisterEventPopupComponent,
        AuthUserPopupComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSelectModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatExpansionModule,
        MatListModule,
        MatMenuModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
