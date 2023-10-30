import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as moment from "moment";

@Component({
    selector: 'detailed-card',
    templateUrl: './detailed-card.component.html',
    styleUrls: ['./detailed-card.component.less']
})

export class DetailedCardComponent implements OnChanges {
    @Input() public image!: string;
    @Input() public price!: string;
    @Input() public date!: string;
    @Input() public location!: string;
    @Input() public place!: string;
    @Input() public title!: string;
    @Input() public duration!: string;

    ngOnChanges(changes: SimpleChanges): void {
        this.date = `${moment(changes["date"].currentValue).add(new Date().getTimezoneOffset(), "minutes").locale("ru").format("DD MMMM, HH:mm")}`;
        this.date = this.date[0].toUpperCase() + this.date.slice(1);
        this.duration = `${moment(changes["duration"].currentValue, 'hh:mm:ss').format('H')} ч`
    }
}
