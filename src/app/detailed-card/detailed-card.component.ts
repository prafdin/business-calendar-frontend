import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import KeenSlider, {KeenSliderInstance} from "keen-slider";
import {HttpService} from "../services/http.service";
import { BACKEND_SERVER_URL } from "../common/constants";
import { MatDialog } from "@angular/material/dialog";
import { RegisterEventPopupComponent } from "../register-event-popup/register-event-popup.component";

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

    public readonly BACKEND_SERVER_URL = BACKEND_SERVER_URL;

    constructor(private router: Router, private httpService: HttpService, public dialog: MatDialog) {
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

    public openDialog(): void {
        const dialogRef = this.dialog.open(RegisterEventPopupComponent, {
            data: {eventId: this.selectedEvent.id},
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
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
