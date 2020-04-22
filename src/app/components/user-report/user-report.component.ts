import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent {
  doSend: boolean;

  constructor(
    public dialogRef: MatDialogRef<UserReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
  }

  onClick(doSend): void {
    this.doSend = doSend;
    this.dialogRef.close({ doSend: this.doSend, description: this.data });
  }

}
