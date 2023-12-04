import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as moment from "moment";
import {Router} from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { RegisterEventPopupComponent } from "../register-event-popup/register-event-popup.component";

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

    isAllowJoin: boolean = false;

    constructor(public router: Router, public dialog: MatDialog) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isAllowJoin = new Date(this.date.slice(0,21)) < new Date()
        this.date = `${moment(changes["date"].currentValue).add(new Date().getTimezoneOffset(), "minutes").locale("ru").format("DD MMMM, HH:mm")}`;
        let duration = moment(changes["duration"].currentValue, 'hh:mm:ss');
        let formatString = `${duration.hours() != 0 ? 'H час' : ''}${duration.hours() == 0 ? '' : ' '}${duration.minutes() != 0 ? 'mm минут' : ''}`;
        this.duration = `${duration.format(formatString)}`
    }

    public onDetailsClick(): void {
        this.router.navigate(["/event"],
            {
                queryParams: { eventId: this.id },
            })
    }

    public openDialog(): void {
        const dialogRef = this.dialog.open(RegisterEventPopupComponent, {
            data: {eventId: this.id},
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}
