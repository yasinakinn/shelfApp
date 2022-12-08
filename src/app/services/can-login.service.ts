import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CanLoginService implements CanLoad{

  constructor(
    public userService: UserService,
    public router: Router
  ) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userService.isLoggedIn().then((response: any) => {
      console.log(response);
      
      if(response) {
        this.router.navigate(['/shelves']);
        this.userService.loginEvent('login');
        return false;
      }else {
        return true;
      }
    });
  }
}
