import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Shelves',
      url: '/shelves',
      icon: 'book'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    },
  ];

  login = false;

  constructor(
    public router: Router,
    private userService: UserService,
  ) {
  }

  async ngOnInit() {    
    this.userService.isLoggedIn().then((response: any) => {
      if (response) {
        this.login = true;
      } else {
        this.login = false;
      }
    });
    this.userService.getLoginEvent().then((response: any) => {
      response.subscribe((data: any) => {
        console.log(data);
        
        if (data === 'login') {
          this.login = true;
        } else {
          this.login = false;
        }
      }
      );
    }
    );
  }

  //logout
  async logout() {
    this.login = false;
    await this.userService.logout();
    this.router.navigate(['/login']);
  }
}
