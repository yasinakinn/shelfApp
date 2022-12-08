import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shelves',
  templateUrl: './shelves.page.html',
  styleUrls: ['./shelves.page.scss'],
})
export class ShelvesPage implements OnInit {

  shelves: any = [];
  skeleton : boolean = true;
  constructor(
    public dataService: DataService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.userService.getUser().then((user: any) => {
      this.dataService.post('shelves', user).subscribe((shelves: any) => {
        this.shelves = shelves;
        this.skeleton = false;
        console.log(this.shelves);
      }, (error: any) => {
        console.log(error);
        this.skeleton = false;
      });
    });
  }

}
