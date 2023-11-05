import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as moment from "moment";
import {Router} from "@angular/router";

@Component({
    selector: 'event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.less']
})
export class EventCardComponent implements OnChanges {
    @Input() public image!: string;
    @Input() public date!: string;
    @Input() public address!: string;
    @Input() public title!: string;
    @Input() public duration!: string;
    @Input() public description!: string;
    @Input() public id!: string;


    constructor(public router: Router) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.date = `${moment(changes["date"].currentValue).add(new Date().getTimezoneOffset(), "minutes").locale("ru").format("DD MMMM, HH:mm")}`;
        let duration = moment(changes["duration"].currentValue, 'hh:mm:ss');
        let formatString = `${duration.hours() != 0 ? 'H час' : ''}${duration.hours() == 0 ? '' : ' '}${duration.minutes() != 0 ? 'mm минут' : ''}`;
        this.duration = `${duration.format(formatString)}`
    }

    public onDetailsClick(): void {
        this.router.navigate(["/event"],
            {
                state: {
                    title: this.title,
                    image: this.image,
                    address: this.address,
                    date: this.date,
                    duration: this.duration,
                    description: this.description,
                    id: this.id
                }
            })
    }
}
