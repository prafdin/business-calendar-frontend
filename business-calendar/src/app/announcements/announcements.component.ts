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

    currentSlide: number = 0
    dotHelper: Array<Number> = []
    slider!: KeenSliderInstance;

    ngAfterViewInit() {
        this.slider = new KeenSlider(this.sliderRef.nativeElement,
            {
                initial: this.currentSlide,
                slideChanged: (s) => {
                    this.currentSlide = s.track.details.rel
                },
                loop: true,
            },
            [
                (slider) => {
                    let timeout: number | null = null;
                    let mouseOver = false;

                    function clearNextTimeout() {
                        timeout && clearTimeout(timeout);
                    }

                    function nextTimeout() {
                        timeout && clearTimeout(timeout);
                        if (mouseOver) {
                            return;
                        }
                        timeout = setTimeout(() => {
                            slider.next();
                        }, 4000);
                    }

                    slider.on("created", () => {
                        slider.container.addEventListener("mouseover", () => {
                            mouseOver = true;
                            clearNextTimeout();
                        })
                        slider.container.addEventListener("mouseout", () => {
                            mouseOver = false;
                            nextTimeout();
                        })
                        nextTimeout();
                    })
                    slider.on("dragStarted", clearNextTimeout);
                    slider.on("animationEnded", nextTimeout);
                    slider.on("updated", nextTimeout);
                },
            ]
        )
        this.dotHelper = [
            ...Array(this.slider.track.details.slides.length).keys(),
        ]
    }

    ngOnDestroy() {
        if (this.slider) {
            this.slider.destroy();
        }
    }
}
