import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as moment from "moment";
import {DataService} from "../common/data-service";

@Component({
  selector: 'event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.less']
})
export class EventCardComponent implements OnChanges {
  @Input() public image!: string;
  @Input() public date!: string;
  @Input() public place!: string;
  @Input() public title!: string;
  @Input() public duration!: string;
  @Input() public description!: string;
  private _dataService: DataService;
  constructor(dataService: DataService) {
    this._dataService = dataService;
    console.log(this.title);
  }
  setData(): void{
    this._dataService.setValue('title', this.title);
    this._dataService.setValue('image', this.image);
    this._dataService.setValue('date', this.date);
    this._dataService.setValue('place', this.place);
    this._dataService.setValue('duration', this.duration);
    this._dataService.setValue('description', this.description);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.date = `${moment(changes["date"].currentValue).add(new Date().getTimezoneOffset(), "minutes").locale("ru").format("DD MMMM, HH:mm")}`;
    this.duration = `${moment(changes["duration"].currentValue, 'hh:mm:ss').format('H')} ч`
  }
}
