import {Component, Input} from '@angular/core';
import {DataService} from "../common/data-service";


@Component({
    selector: 'detailed-card',
    templateUrl: './detailed-card.component.html',
    styleUrls: ['./detailed-card.component.less']
})

export class DetailedCardComponent {
    public image!: string;
    public date!: string;
    public place!: string;
    public title!: string;
    public duration!: string;
    public description!: string;
    constructor(dataService: DataService) {
        this.title = dataService.getValue('title');
        this.image = dataService.getValue('image');
        this.date = dataService.getValue('date');
        this.place = dataService.getValue('place');
        this.duration = dataService.getValue('duration');
        this.description = dataService.getValue('description');
    }

}
