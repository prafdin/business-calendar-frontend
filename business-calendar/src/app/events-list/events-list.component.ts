import { Component, Input } from '@angular/core';

@Component({
    selector: 'events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.less']
})
export class EventsListComponent {
    @Input() public data!: any[];
}
