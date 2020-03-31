import { Component, OnInit, Injectable, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class MyProfileComponent implements OnInit {

  @Input() id: number;
  @Input() username: string;
  @Input() enrolmentDate: Date;
  @Input() points: number;

  @Input() name: string;
  @Input() surname: string;
  @Input() birthdayDate: Date;
  @Input() email: string;
  @Input() phoneNo: string;
  @Input() address: string;

  constructor(private userService: UserService) {
    const userLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
    this.username = userLocalStorage.username;
    const user = userService.findByUsername(this.username);
    console.log("user: ", (user as unknown as User));
    this.id = (user as unknown as User).id;
    this.enrolmentDate = (user as unknown as User).enrolmentDate;
    this.points = (user as unknown as User).points;
    this.name = (user as unknown as User).name;
    this.surname = (user as unknown as User).surname;
    this.birthdayDate = (user as unknown as User).birthday;
    this.email = (user as unknown as User).email;
    this.phoneNo = (user as unknown as User).phoneNo;
    this.address = (user as unknown as User).address;
  }

  ngOnInit() {
    // this.userService.findByUsername(this.username).subscribe((jsonObject: User) => {
    //   this.id = (jsonObject as User).id;
    //   this.username = (jsonObject as User).username;
    //   this.enrolmentDate = (jsonObject as User).enrolmentDate;
    //   this.points = (jsonObject as User).points;
    //   this.name = (jsonObject as User).name;
    //   this.surname = (jsonObject as User).surname;
    //   this.birthdayDate = (jsonObject as User).birthday;
    //   this.email = (jsonObject as User).email;
    //   this.phoneNo = (jsonObject as User).phoneNo;
    //   this.address = (jsonObject as User).address;
    // });
  }
}
