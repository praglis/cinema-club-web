import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    @ViewChild('passwordField', { static: true }) passwordField: ElementRef;

    registerForm: FormGroup;
    loading = false;
    submitted = false;
    showAddressForm = false;
    error: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: RegisterService
    ) {
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            passwordRepeat: ['', [repeatPasswordValidator(this.passwordField.nativeElement)]],
            country: ['',],
            state: ['',],
            city: ['',],
            street_name: ['',]
        });
    }

    get registerFormControls() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }
        const registrationValues = this.convertToRegistractionValues(this.registerForm.value);

        this.loading = true;
        this.userService.register(registrationValues)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login'], { queryParams: { registered: true } });
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }

    convertToRegistractionValues(values) {
        return {
            email: values.email,
            password: values.password,
            username: values.username,
            address: {
                city: values.city,
                country: values.country,
                state: values.state,
                street_name: values.street_name
            }
        }
    }

    toggleAddressField() {
        this.showAddressForm = !this.showAddressForm;
    }
}

export function repeatPasswordValidator(passwordElement: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const equals = passwordElement.value === control.value;
        return equals ? null : { 'passwordNotMatch': { value: control.value } };
    };
}
