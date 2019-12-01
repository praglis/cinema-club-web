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

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.findById('0').subscribe((jsonObject: User) => {
      this.id = (jsonObject as User).id;
      this.username = (jsonObject as User).username;
    });
  }
}
