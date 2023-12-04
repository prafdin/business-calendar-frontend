import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import KeenSlider, {KeenSliderInstance} from "keen-slider"
import {HttpService} from "../services/http.service";
import * as moment from "moment/moment";
import {Router} from "@angular/router";

@Component({
    selector: 'announcements',
    templateUrl: './announcements.component.html',
    styleUrls: ['./announcements.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class AnnouncementsComponent implements OnDestroy, OnInit {
    @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>;

    currentSlide: number = 0
    dotHelper: Array<Number> = []
    slider!: KeenSliderInstance;

    public data: any[] = [];

    constructor(private httpService: HttpService, public router: Router) {
    }

    ngOnInit(): void {
        this.httpService.getAnnouncements()
            .subscribe((res) => {
                this.data = res.data;
                this.data = this.data.map((announcement: any) => {
                    return {
                        ...announcement,
                        eventDate: `${moment(announcement.eventDate).add(new Date().getTimezoneOffset(), "minutes").locale("ru").format("DD MMMM, HH:mm")}`,
                        eventDuration: `${moment(announcement.eventDuration, 'hh:mm:ss').format('H')} ч`
                    }
                })
                this.initSlider();
            })
    }

    private initSlider(): void {
        setTimeout(() => {
            this.slider = new KeenSlider(this.sliderRef.nativeElement,
                {
                    initial: this.currentSlide,
                    slideChanged: (s) => {
                        this.currentSlide = s.track.details.rel
                    },
                    loop: true,
                    drag: false
                }
            )
            this.dotHelper = [
                ...Array(this.slider.track.details?.slides.length).keys(),
            ]
        })
    }

    ngOnDestroy() {
        if (this.slider) {
            this.slider.destroy();
        }
    }

    public onDetailsClick(announcement: any): void {
        this.router.navigate(["/event"],
            {
                queryParams: { eventId: announcement.id },
            })
    }
}
