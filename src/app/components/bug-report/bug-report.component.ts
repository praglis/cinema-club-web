import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-bug-report',
  templateUrl: './bug-report.component.html',
  styleUrls: ['./bug-report.component.css']
})
export class BugReportComponent {
  doSend: boolean;

  constructor(
    public dialogRef: MatDialogRef<BugReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
  }

  onClick(doSend): void {
    this.doSend = doSend;
    this.dialogRef.close({doSend: this.doSend, description: this.data});
  }
}
