import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  public text: string;
  successMsg: string;
  errorMsg: string;

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.findLoggedUser().subscribe((jsonObject: User) => {
      this.user = jsonObject as User;

      if (this.user.firstLogIn) {
        this.user.firstLogIn = false;
        this.userService.updateProfile(this.user).subscribe((data) => {
            this.successMsg = 'OK';
          },
          error => {
            this.errorMsg = error.message;
          });
        this.router.navigate(['/questionaire']);
      }
    });
    this.text = 'home init test';
  }
}
