import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
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
  @Input() public duration!: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.date = `${moment(changes["date"].currentValue).add(new Date().getTimezoneOffset(), "minutes").locale("ru").format("DD MMMM, HH:mm")}`;
    this.duration = `${moment(changes["duration"].currentValue, 'hh:mm:ss').format('H')} ч`
  }
}
