import { Component, Input } from '@angular/core';

@Component({
    selector: 'event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.less']
})
export class EventCardComponent {
    @Input() public image!: string;
    @Input() public price!: string;
    @Input() public date!: string;
    @Input() public location!: string;
    @Input() public place!: string;
    @Input() public title!: string;
}
