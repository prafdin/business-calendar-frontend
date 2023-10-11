import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider";
import * as moment from 'moment';

export interface MonthDictionary {
    [monthNumber: number]: string;
}

export interface WeekDaysDictionary {
    [weekDayNumber: number]: string;
}

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent implements AfterViewInit {
    @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

    slider!: KeenSliderInstance;

    public calendarSliderData: any[] = [];
    private monthsDictionary: MonthDictionary = {
        1: "Янв",
        2: "Фев",
        3: "Март",
        4: "Апр",
        5: "Май",
        6: "Июнь",
        7: "Июль",
        8: "Авг",
        9: "Сент",
        10: "Окт",
        11: "Нояб",
        12: "Дек"
    };
    private weekDaysDictionary: WeekDaysDictionary = {
        1: "Пн",
        2: "Вт",
        3: "Ср",
        4: "Чт",
        5: "Пт",
        6: "Сб",
        0: "Вс",
    };
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
        this.getYearCalendar();
    }

    public getYearCalendar(): moment.Moment[] {
        const currentYear = moment().year();
        const yearStart = moment([currentYear, 0, 1]);

        const calendar: moment.Moment[] = [];
        for (let i = 0; i < 365; i++) {
            calendar.push(yearStart.clone().add(i, 'days'));
        }
        let currentMonth: number = 0;
        this.calendarSliderData.push({
            title: this.monthsDictionary[currentMonth + 1]
        });
        for (let dayItem of calendar) {
            if (dayItem.month() !== currentMonth) {
                currentMonth = dayItem.month();
                this.calendarSliderData.push({
                    title: this.monthsDictionary[currentMonth + 1],
                    subTitle: null
                });
            }
            this.calendarSliderData.push({
                title: dayItem.date(),
                subTitle: this.weekDaysDictionary[dayItem.weekday()],
                isCurrentDate: dayItem.toDate().toLocaleDateString() === new Date().toLocaleDateString()
            });
        }
        return calendar;
    }

    public isWeekendDay(day: string): boolean {
        return day === "Сб" || day === "Вс";
    }

    public onMonthSelect(event: any): void {
        this.slider.moveToIdx(this.monthPickerOptions.find((option) => option.value === event.value).slideNumber);
    }
}
