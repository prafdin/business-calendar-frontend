import {Component, ViewChild} from '@angular/core';
import {AnnouncementsComponent} from "../announcements/announcements.component";
import {PosterComponent} from "../poster/poster.component";

@Component({
    selector: 'home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.less']
})
export class HomePageComponent {
    @ViewChild('announcements') announcements!: AnnouncementsComponent;
    @ViewChild('poster') poster!: PosterComponent;

}