import { Component, OnInit, Injectable, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/user.interface';
import { Address } from '../../interfaces/address.interface';
import { stringify } from 'querystring';

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
  @Input() address: Address;


  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.findLoggedUser().subscribe((jsonObject: User) => {
      this.id = (jsonObject as User).id;
      this.username = (jsonObject as User).username;
      this.enrolmentDate = (jsonObject as User).enrolmentDate;
      this.points = (jsonObject as User).points;
      this.name = (jsonObject as User).name;
      this.surname = (jsonObject as User).surname;
      this.birthdayDate = (jsonObject as User).birthday;
      this.email = (jsonObject as User).email;
      this.phoneNo = (jsonObject as User).phoneNo;
      this.address = (jsonObject as User).address as unknown as Address;
    });
  }

  getCleanAddress(): string {
    console.log('address:', this.address);

    const cleanAddress = this.address.streetName + ' ' + this.address.houseNumber + ', '
    + this.address.city + ', ' + this.address.state + ', ' + this.address.country;
    return cleanAddress;
  }
}
