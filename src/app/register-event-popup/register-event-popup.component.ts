import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../services/http.service";
import {catchError, throwError} from "rxjs";

@Component({
    selector: 'app-register-event-popup',
    templateUrl: './register-event-popup.component.html',
    styleUrls: ['./register-event-popup.component.less']
})
export class RegisterEventPopupComponent {
    public phoneNumber: string = "+7 (";
    private regex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    public isLoading: boolean = false;
    public responseStatus!: number;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { eventId: string },
                public dialogRef: MatDialogRef<RegisterEventPopupComponent>,
                private httpService: HttpService,
    ) {
    }

    public registerForm: FormGroup = new FormGroup({
        "firstName": new FormControl("", [Validators.required]),
        "lastName": new FormControl("", [Validators.required]),
        "emailAddress": new FormControl("", [Validators.required, Validators.email]),
        "phoneNumber": new FormControl("", [Validators.required, Validators.pattern(this.regex)])
    });

    public submit(): void {
        this.isLoading = true;
        this.httpService.registerToEvent(this.registerForm.value, this.data.eventId)
            .pipe(
                catchError((err) => {
                    this.responseStatus = err.status;
                    this.isLoading = false;
                    return throwError(err);
                }),
            )
            .subscribe((res) => {
                this.isLoading = false;
                this.responseStatus = 200;
            })
    }

    public formatPhoneNumber(event: any) {
        if ((event.key === "Backspace" || event.key === "Delete") && this.phoneNumber.length === 4) {
            event.preventDefault();
            return
        }
        if (this.phoneNumber.length < 4) {
            this.phoneNumber = '+7 (';
        }
        if (Number.isInteger(+event.key) || event.key === "+" || event.key === "Backspace" || event.key === "Delete") {
            if (event.key !== 'Backspace') {
                if (this.phoneNumber.length === 7) {
                    this.phoneNumber += ') ';
                } else if (this.phoneNumber.length === 12) {
                    this.phoneNumber += '-';
                } else if (this.phoneNumber.length === 15) {
                    this.phoneNumber += '-';
                }
            } else {
                if (this.phoneNumber.length === 9) {
                    this.phoneNumber = this.phoneNumber.slice(0, 7);
                } else if (this.phoneNumber.length === 13) {
                    this.phoneNumber = this.phoneNumber.slice(0, 12);
                } else if (this.phoneNumber.length === 16) {
                    this.phoneNumber = this.phoneNumber.slice(0, 15);
                }
            }
        } else {
            event.preventDefault();
        }
    }
}
