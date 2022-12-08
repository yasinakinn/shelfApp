import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  header: any;
  message: any;
  buttons: any;

  credentials: FormGroup | any = {
    email: "",
    password: ""
  };

  pwdIcon = "eye-outline";
  showPwd = false;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });

  }


  login() {
    this.userService.login(this.credentials.value.email, this.credentials.value.password).then((response: any) => {
      if(response.status === "success") {
        this.userService.setUser(response.user);
        this.router.navigate(['/home']);
        console.log(response.user.title, 'logged in');
        this.userService.loginEvent('login');
      }else {

        
        this.header = "Error";
        this.message = response.error;
        if(response.error.password){
          this.message = response.error.password[0];
        }
        if(response.error.email){
          this.message = response.error.email[0];
        }
        this.buttons = [
          {
            text: "OK",
            role: "cancel",
            cssClass: "secondary"
          }
        ];
        this.alertCtrl.create({
          header: this.header,
          message: this.message,
          buttons: this.buttons
        }).then((alert) => {
          alert.present();
        });
      }

    });
  }

  togglePwd() {
    this.showPwd = !this.showPwd;
    this.pwdIcon = this.showPwd ? "eye-off-outline" : "eye-outline";
  }

}
