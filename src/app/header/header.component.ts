import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginRegisterUserPopupComponent} from "../login-user-popup/login-register-user-popup.component";


@Component({
    selector: 'header-menu',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent {
    isAuth: boolean = true;


    constructor(public dialog: MatDialog) {
    }

    public openDialog(): void {
        const dialogRef = this.dialog.open(LoginRegisterUserPopupComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });

    }

    public logOut(): void {
        this.isAuth = false;
    }
}

