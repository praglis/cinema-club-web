import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  users: string[] = [];
  currentUser: string;
  public userModel: string;

  constructor(private activatedRoute: ActivatedRoute,
              private adminService: AdminService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.getUserObserver().subscribe(response => this.users = response);
  }

  onSubmitBanUser(event: any) {
    this.banUser(this.currentUser).subscribe();
  }

  onSubmitBlockUser(event: any) {
    this.blockUser(this.currentUser).subscribe();
  }

  onSubmitActiveUser(event: any) {
    this.activeUser(this.currentUser).subscribe();
  }

  onSubmitDeleteUser(event: any) {
    this.deleteUser(this.currentUser).subscribe();
  }


  private getUserObserver() {
    return this.userService.getAllUsers();
  }

  private banUser(userName: string) {
    return this.adminService.banUser(userName);
  }

  private blockUser(userName: string) {
    return this.adminService.blockUser(userName);
  }

  private activeUser(userName: string) {
    return this.adminService.activeUser(userName);
  }

  private deleteUser(userName: string) {
    return this.adminService.deleteUser(userName);
  }

  public saveCode(e): void {
    const name = e.target.value;
    this.currentUser = name;
    const list = this.users.filter(x => x === name)[0];
  }
}
