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

  editedField: string;

  editedProfile: User;

  constructor(private userService: UserService) {
    this.editedField = 'none';
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

  onSubmit() {
    console.log('OnSubmit');
    this.editedField = 'none';
    console.log('editedProfile:' + JSON.stringify(this.editedProfile));

    const userValues = this.convertToUserValues(this.editedProfile);
    this.userService.updateProfile(userValues);
    console.log('OnSubmit YEET');
  }

  getCleanAddress(user: User): string {
    const cleanAddress = user.address.streetName + ' ' + user.address.houseNumber + ', '
      + user.address.city + ', ' + user.address.state + ', ' + user.address.country;
    return cleanAddress;
  }

  edit(field: string): void {
    this.editedField = field;
  }

  convertToUserValues(values) {
    return {
      name: values.name,
      surname: values.surname,
      birthday: values.birthday,
      phoneNo: values.phoneNo,
      address: {
        country: values.address.country,
        state: values.address.state,
        city: values.address.city,
        streetName: values.address.streetName,
        houseNumber: values.address.houseNumber
      }
    };
  }
}
