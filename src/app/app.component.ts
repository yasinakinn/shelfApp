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
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];

  login = false;

  constructor(
    public router: Router,
    private userService: UserService,
  ) {

  }

  async ngOnInit() {
    this.userService.getLoginEvent().then((response: any) => {
      response.subscribe((data: any) => {
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
