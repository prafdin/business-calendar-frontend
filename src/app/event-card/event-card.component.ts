import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from "moment";

@Component({
    selector: 'event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.less']
})
export class EventCardComponent implements OnChanges {
    @Input() public image!: string;
    @Input() public price!: string;
    @Input() public date!: string;
    @Input() public location!: string;
    @Input() public place!: string;
    @Input() public title!: string;

    ngOnChanges(changes: SimpleChanges): void {
        this.date = `${moment(changes["date"].currentValue).locale("ru").format("dddd, Do MMMM, h:mm")}`;
        this.date = this.date[0].toUpperCase() + this.date.slice(1);
    }
}
