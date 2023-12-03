import {Component, Inject} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";
import {HttpService} from "../services/http.service";
import {catchError, throwError} from "rxjs";


@Component({
    selector: 'app-login-register-user-popup',
    templateUrl: './login-register-user-popup.component.html',
    styleUrls: ['./login-register-user-popup.component.less']
})
export class LoginRegisterUserPopupComponent {
    public isLoading: boolean = false;
    public isRegisterMode: boolean = false;
    public responseStatus!: number;
    public loginForm: FormGroup;
    public registerForm: FormGroup;
    private regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,40}$/;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { eventId: string },
                public dialogRef: MatDialogRef<LoginRegisterUserPopupComponent>,
                private httpService: HttpService,
                public dialog: MatDialog) {
        this.loginForm = new FormGroup({
            "loginEmailAddress": new FormControl("", [Validators.required, Validators.email]),
            "loginPassword": new FormControl("", [Validators.required]),
        });
        this.registerForm = new FormGroup({
            "firstName": new FormControl("", [Validators.required]),
            "lastName": new FormControl("", [Validators.required]),
            "emailAddress": new FormControl("", [Validators.required, Validators.email]),
            "registerPassword": new FormControl("", [Validators.required, Validators.pattern(this.regex)]),
            "confirmPass": new FormControl("", [Validators.required])
        });
        this.registerForm.get('confirmPass')!.setValidators(this.passwordMatchValidator(this.registerForm.get('registerPassword')!));
        this.registerForm.get('registerPassword')!.valueChanges.subscribe(() => {
            this.registerForm.get('confirmPass')!.updateValueAndValidity();
        });
    }

    passwordMatchValidator(control: AbstractControl): ValidatorFn {
        return (confirmPassControl: AbstractControl): ValidationErrors | null => {
            const registerPassword = control.value;
            const confirmPass = confirmPassControl.value;
            if (registerPassword === confirmPass) {
                return null;
            } else {
                return {mismatchedPasswords: true};
            }
        };
    }

    public submit(): void {
        this.isLoading = true;
        this.httpService.registerToEvent(this.loginForm.value, this.data.eventId)
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
        // this.loginForm.markAsUntouched({onlySelf: true});
        this.loginForm.reset();
    }

}
