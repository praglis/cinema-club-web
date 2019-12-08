import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  get registerFormControls() { return this.resetPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.resetPasswordForm.invalid) {
      return;
    }
    const registrationValues = this.convertToRegistractionValues(this.resetPasswordForm.value);

    this.loading = true;
    this.authenticationService.resetPassword(registrationValues)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login'], { queryParams: { registered: true } });
        },
        error => {
          this.error = error.message;
          this.loading = false;
        });
  }

  convertToRegistractionValues(values) {
    return {
      username: values.username,
    }
  }
}
