import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { HttpService } from "../services/http.service";
import * as moment from "moment/moment";

@Component({
    selector: 'announcements',
    templateUrl: './announcements.component.html',
    styleUrls: ['./announcements.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class AnnouncementsComponent implements AfterViewInit, OnDestroy, OnInit {
    @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

    currentSlide: number = 0
    dotHelper: Array<Number> = []
    slider!: KeenSliderInstance;

    public data: any[] = [];

    constructor(private httpService: HttpService) {
    }

    ngOnInit(): void {
        this.httpService.getAnnouncements()
            .subscribe((res) => {
                this.data = res.data;
                this.data = this.data.map((announcement: any) => {
                    return {
                        ...announcement,
                        eventDate: moment(announcement.eventDate).locale("ru").format("DD MMMM, HH:mm")
                    }
                })
            })
    }


    ngAfterViewInit() {
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
}
