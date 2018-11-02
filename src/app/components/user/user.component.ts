import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.css']
})

export class UserComponent implements OnInit {
  public currentUserId: number;
  public currentUser: any;

  constructor(private userService: UserService, private activeRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.currentUserId = this.activeRoute.snapshot.params.id;
    this.getUserById(this.currentUserId);
  }

  public getUserById(id): void {
    this.userService.getById(id).subscribe((response: any) => {
      this.currentUser = response;
    });
  }

  public getBack(): void {
    this.router.navigate(['dashboard']).catch();
  }
}
