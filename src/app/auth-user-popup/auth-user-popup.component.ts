import {Component, Inject} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";
import {HttpService} from "../services/http.service";
import {catchError, throwError} from "rxjs";


@Component({
    selector: 'app-auth-user-popup',
    templateUrl: './auth-user-popup.component.html',
    styleUrls: ['./auth-user-popup.component.less']
})
export class AuthUserPopupComponent {
    public isLoading: boolean = false;
    public isRegisterMode: boolean = false;
    public responseStatus!: number;
    public authForm: FormGroup;
    private regex = /^.{8,40}$/;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { eventId: string },
                public dialogRef: MatDialogRef<AuthUserPopupComponent>,
                private httpService: HttpService,
                public dialog: MatDialog) {
        this.authForm = new FormGroup({
            "firstName": new FormControl(""),
            "lastName": new FormControl(""),
            "emailAddress": new FormControl("", [Validators.required, Validators.email]),
            "password": new FormControl("", [Validators.required, this.randomPasswordValidator()]),
            "confirmPass": new FormControl("")
        });
        this.authForm.get('password')!.valueChanges.subscribe(() => {
            this.authForm.get('confirmPass')!.updateValueAndValidity();
        });
    }
    public randomPasswordValidator(): ValidatorFn {
        return (
            control: AbstractControl
        ): { [key: string]: boolean } | null => {
            let valid = this.regex.test(control.value);
            return valid || !this.isRegisterMode ? null : { randomErrorName: true };
        };
    }

    passwordMatchValidator(control: AbstractControl): ValidatorFn {
        return (confirmPassControl: AbstractControl): ValidationErrors | null => {
            const password = control.value;
            const confirmPass = confirmPassControl.value;
            if (password === confirmPass) {
                return null;
            } else {
                return {mismatchedPasswords: true};
            }
        };
    }

    public submit(): void {
        this.isLoading = true;
        this.httpService.registerToEvent(this.authForm.value, this.data.eventId)
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


    public switchMode(): void {
        this.isRegisterMode = !this.isRegisterMode;
        if (this.isRegisterMode) {
            this.authForm.get('lastName')?.setValidators([Validators.required]);
            this.authForm.get('firstName')?.setValidators([Validators.required]);
            this.authForm.get('confirmPass')?.setValidators([Validators.required, this.passwordMatchValidator(this.authForm.get("password") as AbstractControl)]);
        } else {
            this.authForm.get('lastName')?.clearValidators();
            this.authForm.get('firstName')?.clearValidators();
            this.authForm.get('confirmPass')?.clearValidators();
        }
        // this.authForm.markAsUntouched({onlySelf: true});
        this.authForm.reset();
    }

}
