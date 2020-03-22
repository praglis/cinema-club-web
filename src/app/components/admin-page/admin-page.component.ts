import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../../services/movie.service';
import {AdminService} from '../../services/admin.service';
import {MoviesList} from '../../interfaces/movieslist.interface';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent implements OnInit {
  usersList: string[] = [];
  currentUser: string;
  public userModel: string;

  constructor(private activatedRoute: ActivatedRoute,
              private adminService: AdminService) { }

  ngOnInit() {
    this.getUserObserver().subscribe(response =>
    this.usersList = response);

  }

  onSubmit(event: any) {
    this.banUser(this.currentUser).subscribe();
  }


  private getUserObserver() {
    return this.adminService.getAllUsers();
  }

  private banUser(userName: string) {
    return this.adminService.banUser(userName);
  }

  public saveCode(e): void {
    const name = e.target.value;
    this.currentUser = name;
    const list = this.usersList.filter(x => x === name)[0];
  }

}
