import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  error: string;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    let token = this.route.snapshot.queryParams['token'];
    let username = this.route.snapshot.queryParams['username'];
    if (token == undefined || username == undefined) {
      this.router.navigate(['/login']);
      return;
    }
    this.authenticationService.activeAccount(token, username)
      .subscribe(() => {
        this.router.navigate(['/login']);
      }, error => {
        this.error = error.message;
      });
  }

}
