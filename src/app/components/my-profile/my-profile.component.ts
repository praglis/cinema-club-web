import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/user.interface';
import { DatePipe } from '@angular/common';
import { BugReportComponent } from '../bug-report/bug-report.component';
import { MatDialogModule, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { BugReport } from 'src/app/interfaces/bug.report.interface';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers: [DatePipe]
})
@Injectable({
  providedIn: 'root'
})
export class MyProfileComponent implements OnInit {

  editedField: string;
  editedProfile: User;

  bugDescription = '';

  constructor(
    private userService: UserService,
    private reportService: ReportService,
    private datePipe: DatePipe,
    private dialog: MatDialog) {
    this.editedField = 'none';
  }

  ngOnInit() {
    this.userService.findLoggedUser().subscribe((jsonObject: User) => {
      this.editedProfile = jsonObject as User;
      this.editedProfile.birthday = this.datePipe.transform(this.editedProfile.birthday, 'MM-dd-yyyy');
    });
  }

  onSubmit() {
    this.editedField = 'none';
    const userValues = this.convertToUserValues(this.editedProfile);
    this.userService.updateProfile(userValues);
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
      birthday: new Date(values.birthday),
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

  reportBug() {
    console.log('bugDesc: ', this.bugDescription);
    const dialogRef = this.dialog.open(BugReportComponent, {
      hasBackdrop: true,
      data: this.bugDescription
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed. Result:', result);
      if (result.doSend === true) { this.reportService.reportBug(this.prepareBugReport(result.description)); }
    });
  }

  prepareBugReport(description: string) {
    return {
      reporter: this.editedProfile.username,
      reportDate: new Date(),
      bugDescription: description
    };
  }
}
