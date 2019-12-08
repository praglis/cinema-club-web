import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {RegisterService} from '../../services/register.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('passwordField', { static: true }) passwordField: ElementRef;
  changePasswordForm: FormGroup;
  loading = false;
  submitted = false;
  token: string;
  username: string;
  error: string;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: RegisterService
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: ['', [repeatPasswordValidator(this.passwordField.nativeElement)]],
    });
    this.token = this.route.snapshot.queryParams['token'];
    this.username = this.route.snapshot.queryParams['username'];
    if (this.token == undefined || this.username == undefined) {
      this.router.navigate(['/login']);
      return;
    }
  }

  get registerFormControls() { return this.changePasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.changePasswordForm.invalid) {
      return;
    }
    const user = this.convertToRegistractionValues(this.changePasswordForm.value);

    this.loading = true;
    this.authenticationService.changePassword(user, this.token, this.username)
      .subscribe(data => {
        this.router.navigate(['/login']);
      }, error => {
        this.error = error.message;
      });
  }

  convertToRegistractionValues(values) {
    return {
      password: values.password,
    }
  }



}

export function repeatPasswordValidator(passwordElement: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const equals = passwordElement.value === control.value;
    return equals ? null : { 'passwordNotMatch': { value: control.value } };
  };
}
