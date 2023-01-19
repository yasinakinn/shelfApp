import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  shelf = {
    number: '',
    name: '',
    type: '',
    qty: '',
  }
  @Input() toUpdate: any | undefined;
  @Input() user: any | undefined;
  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    if (this.toUpdate) {
      this.shelf = this.toUpdate;
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  shelfOperation() {
    if (this.toUpdate) {
      this.updateShelf();
    } else {
      this.addShelf();
    }
  }

  addShelf() {
    const data = {...this.shelf, email: this.user.email, password: this.user.password}
    this.dataService.post('shelf/add', data).subscribe((response: any) => {
      console.log(response);
      let data ;
      if (Array.isArray(response.name) || Array.isArray(response.number) || Array.isArray(response.type) || Array.isArray(response.qty)) {

      }else{
        this.modalCtrl.dismiss(
          {data: "added"}
        );
      }
    });
  }

  deleteShelf(){
    const data = {...this.shelf, email: this.user.email, password: this.user.password}
    this.dataService.post('shelf/delete', data).subscribe((response: any) => {
      console.log(response);
      this.modalCtrl.dismiss(
        {data: "deleted"}
      );
    });
  }

  updateShelf() { 
    const data = {...this.shelf, email: this.user.email, password: this.user.password}
    this.dataService.post('shelf/update', data).subscribe((response: any) => {
      console.log(response);
      if (Array.isArray(response.name) || Array.isArray(response.number) || Array.isArray(response.type) || Array.isArray(response.qty)) {
      }else{
        this.modalCtrl.dismiss(
          {data: "updated"}
        );
      }
    });
  }

}
