import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shelves',
  templateUrl: './shelves.page.html',
  styleUrls: ['./shelves.page.scss'],
})
export class ShelvesPage implements OnInit {

  summary = [
    { name: 'Shelves', value: 0, icon: 'bookmarks', color: 'primary' },
    { name: 'Item Quantity', value: 0, icon: 'cube', color: 'secondary' },
    { name: 'Users', value: 0, icon: 'people', color: 'tertiary' }
  ];
  filters = [
    { name: 'All', value: 'all', icon: 'bookmarks', color: 'primary' },
    { name: 'Name', value: 'name', icon: 'cube', color: 'secondary' },
    { name: 'Type', value: 'type', icon: 'people', color: 'tertiary' },
    { name: 'Number of Items', value: 'number', icon: 'people', color: 'tertiary' }
  ];
  notifications = [] as any;

  filter = "all"
  keyword = "";
  shelves: any = [];
  results = [...this.shelves];
  user: any = {
    email: '',
    password: '',
    name: '',
    title: '',
  };
  skeleton: boolean = true;
  constructor(
    public dataService: DataService,
    public userService: UserService
  ) { }

  async ngOnInit() {
    await this.userService.getUser().then(async (user: any) => {
      this.user = user;
      await this.getData();


    });
  }

  async getData() {
    this.dataService.post('shelves', this.user).subscribe((shelves: any) => {
      this.shelves = shelves;
      this.summary[0].value = this.shelves.length;
      this.summary[1].value = this.shelves.reduce((a: any, b: any) => a + b.qty, 0);
      this.results = this.shelves.slice(0, 9);
      this.skeleton = false;
      this.generateNotifications();
    }, (error: any) => {
      console.log(error);
      this.skeleton = false;
    });

  }

  handleChange(event: any) {
    if (this.keyword && this.keyword.trim() !== '') {
      this.search(this.keyword);
    }
  }

  search(key: string) {
    this.keyword = key;
    this.skeleton = true;
    if (this.keyword && this.keyword.trim() !== '') {
      this.dataService.post('shelf/search', {
        email: this.user.email,
        password: this.user.password,
        filter: this.filter,
        keyword: this.keyword
      }).subscribe((shelves: any) => {
        this.results = shelves;
        this.results = shelves.slice(0, 9);
        this.skeleton = false;
      }, (error: any) => {
        console.log(error);
      });
    } else {
      this.results = this.shelves.slice(0, 9);
      this.skeleton = false;
    }

  }

  async generateNotifications() {
    this.notifications = [];
    this.shelves.forEach((shelf: any) => {
      if (shelf.qty > 0 && shelf.qty <= 5) {
        this.notifications.push({
          title: shelf.name,
          message: `You have ${shelf.qty} items left on ${shelf.name} shelf`,
          icon: 'warning-circle',
          color: 'warning'
        });
      }
      if (shelf.qty === 0) {
        this.notifications.push({
          title: shelf.name,
          message: `You have no items left on ${shelf.name} shelf`,
          icon: 'alert-circle',
          color: 'danger'
        });
      }

      if(this.notifications.length == this.shelves.length) {
        this.notifications = [];
      }

    }
    );

  }

}
