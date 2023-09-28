import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"

@Component({
    selector: 'announcements',
    templateUrl: './announcements.component.html',
    styleUrls: ['./announcements.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class AnnouncementsComponent implements AfterViewInit, OnDestroy {
    @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

    slider: KeenSliderInstance | null = null;

    ngAfterViewInit() {
        this.slider = new KeenSlider(this.sliderRef.nativeElement);
    }

    ngOnDestroy() {
        if (this.slider) {
            this.slider.destroy();
        }
    }
}
