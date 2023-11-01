import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.less']
})
export class DetailedComponent implements OnInit, AfterViewInit {
    @Input() detailedCardData: string = "";

    constructor(private router: Router) {
        console.log(this.router.getCurrentNavigation()?.extras)
    }


    ngOnInit() {
        console.log(this.router.getCurrentNavigation()?.extras)
    }

    ngAfterViewInit() {
        console.log(this.router.getCurrentNavigation()?.extras)
    }
}
