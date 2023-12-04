import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import KeenSlider, {KeenSliderInstance} from "keen-slider";
import {HttpService} from "../services/http.service";
import {MatDialog} from "@angular/material/dialog";
import {RegisterEventPopupComponent} from "../register-event-popup/register-event-popup.component";
import { switchMap } from "rxjs";
import * as moment from "moment";

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

    constructor(private router: Router, private httpService: HttpService, public dialog: MatDialog, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.queryParams
            .pipe(
                switchMap((value) => {
                    const eventId: string = (value as { eventId: string }).eventId;
                    return this.httpService.getSubImages(eventId)
                        .pipe(
                            switchMap((res) => {
                                this.images = res.data;
                                this.initSlider();

                                return this.httpService.getEvent(eventId)
                            })
                        )
                })
            )
            .subscribe((event) => {
                this.selectedEvent = event.data;
                this.selectedEvent.eventDuration = moment(this.selectedEvent.eventDuration, 'hh:mm:ss').locale("ru").format('H [ч] m [мин]');
                this.images = [{ url: this.selectedEvent.imageURL }, ...this.images];
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

    public onHomeClick(): void {
        this.router.navigate([""])
    }

}
