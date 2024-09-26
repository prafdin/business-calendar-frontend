import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'business-calendar';

    constructor() {
        // @ts-ignore
        console.log(process.env["TESTT1"])
    }

}
