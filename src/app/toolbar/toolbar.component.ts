import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild
} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider";
import * as moment from 'moment';
import { monthsDictionary, weekDaysDictionary } from "../common/constants";

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent implements AfterViewInit {
    @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

    slider!: KeenSliderInstance;

    public calendarSliderData: any[] = [];
    @Output() public onDayCellClick: EventEmitter<any> = new EventEmitter<any>();

    public monthPickerOptions: any[] = [
        { text: "Январь", value: "Jan", slideNumber: 0 },
        { text: "Февраль", value: "Feb", slideNumber: 32 },
        { text: "Март", value: "March", slideNumber: 61 },
        { text: "Апрель", value: "Apr", slideNumber: 93 },
        { text: "Май", value: "May", slideNumber: 124 },
        { text: "Июнь", value: "June", slideNumber: 156 },
        { text: "Июль", value: "July", slideNumber: 187 },
        { text: "Август", value: "Aug", slideNumber: 219 },
        { text: "Сентябрь", value: "Sep", slideNumber: 251 },
        { text: "Октябрь", value: "Oct", slideNumber: 282 },
        { text: "Ноябрь", value: "Nov", slideNumber: 314 },
        { text: "Декабрь", value: "Dec", slideNumber: 345 },
    ];
    public selectedMonth = this.monthPickerOptions[moment().month()].value;
    public selectedSlide: number = moment().dayOfYear() + moment().month();

    constructor(private cdr: ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.slider = new KeenSlider(this.sliderRef.nativeElement, {
                slides: {
                    perView: 13,
                },
                initial: moment().dayOfYear() + moment().month(),
                loop: true
            });
        })
        this.calendarSliderData = this.getYearCalendar(moment().year());
        this.cdr.detectChanges();
    }

    public getYearCalendar(yearNumber: number): any[] {
        const year = moment([yearNumber]).year();
        const calendarData: any[] = [];

        for (let month = 0; month < 12; month++) {
            calendarData.push({ title: monthsDictionary[month + 1], subTitle: null });

            const daysInMonth = moment([year, month]).daysInMonth();
            for (let day = 1; day <= daysInMonth; day++) {
                const date = moment([year, month, day]);
                calendarData.push({
                    title: day,
                    subTitle: weekDaysDictionary[date.weekday()],
                    date: date.format('YYYY-MM-DD'),
                    isCurrentDate: date.toDate().toLocaleDateString() === new Date().toLocaleDateString()
                });
            }
        }

        return calendarData;
    }

    public isWeekendDay(day: string): boolean {
        return day === "Сб" || day === "Вс";
    }

    public onMonthSelect(event: any): void {
        this.selectedSlide = this.monthPickerOptions.find((option) => option.value === event.value).slideNumber;
        this.slider.moveToIdx(this.selectedSlide);
    }

    public onCellClick(dayItem: any): void {
        if (!dayItem.subTitle) {
            return;
        }
        this.calendarSliderData.find((sliderData) => sliderData.isCurrentDate).isCurrentDate = false;
        this.calendarSliderData.find((sliderData) => sliderData.date === dayItem.date).isCurrentDate = true;
        this.selectedMonth = this.monthPickerOptions[moment(dayItem.date).month()].value;
        this.onDayCellClick.emit(dayItem.date);
    }

    public next(): void {
        this.selectedSlide += 2;
        this.slider.moveToIdx(this.selectedSlide);
    }

    public prev(): void {
        this.selectedSlide -= 2;
        this.slider.moveToIdx(this.selectedSlide);
    }
}
