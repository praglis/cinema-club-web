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

  edited: string;

  editedProfile: User;

  constructor(private userService: UserService) {
    this.edited = 'none';
  }

  ngOnInit() {
    this.userService.findLoggedUser().subscribe((jsonObject: User) => {
      this.id = (jsonObject.username as unknown as User).id;
      this.username = (jsonObject.username as unknown as User).username;
      this.enrolmentDate = (jsonObject.username as unknown as User).enrolmentDate;
      this.points = (jsonObject.username as unknown as User).points;
      this.name = (jsonObject.username as unknown as User).name;
      this.surname = (jsonObject.username as unknown as User).surname;
      this.birthdayDate = (jsonObject.username as unknown as User).birthday;
      this.email = (jsonObject.username as unknown as User).email;
      this.phoneNo = (jsonObject.username as unknown as User).phoneNo;
      this.address = (jsonObject.username as unknown as User).address as unknown as Address;
      this.editedProfile = jsonObject.username as unknown as User;
    });
  }

  getCleanAddress(): string {
    const cleanAddress = this.address.streetName + ' ' + this.address.houseNumber + ', '
      + this.address.city + ', ' + this.address.state + ', ' + this.address.country;
    return cleanAddress;
  }

  edit(field: string): void {
    this.edited = field;
  }
}
