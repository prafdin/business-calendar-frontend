import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import KeenSlider, {KeenSliderInstance} from "keen-slider";
import {HttpService} from "../services/http.service";

@Component({
    selector: 'detailed-card',
    templateUrl: './detailed-card.component.html',
    styleUrls: ['./detailed-card.component.less']
})

export class DetailedCardComponent implements OnDestroy, OnInit {
    @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

    currentSlide: number = 0
    dotHelper: Array<Number> = []
    slider!: KeenSliderInstance;

    public images: any[] = [];
    public selectedEvent: any = {};

    constructor(private router: Router, private httpService: HttpService) {
        this.selectedEvent = this.router.getCurrentNavigation()?.extras.state;
    }

    ngOnInit(): void {
        this.httpService.getSubImages(this.selectedEvent.id)
            .subscribe((res) => {
                this.images = res.data;
                let img = { name: this.selectedEvent.image};
                this.images.splice(0, 0, img);
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
}
