import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  response:any;
  secret='SECRET';
  constructor(private frmb:FormBuilder,
              public apiService: ApiService,
              public router: Router
             ) {
      this.loginForm=this.frmb.group({
        email:['',Validators.required],
        password:['',Validators.required]
      });
  }

  ngOnInit(): void {
  }
 
  onLogin() {
    console.log(this.loginForm.value); 

    this.apiService.getManagers().subscribe(res=>{
      console.log(res);
      let data:any=res;
      let login: Boolean=false;
      for(let i=0; i< data.length; i++){
        
      let pass = CryptoJS.AES.decrypt(data[i].password.trim(), 
                      this.secret.trim()).toString(CryptoJS.enc.Utf8);
      console.log(pass);

        if(data[i].email == this.loginForm.value.email && 
          pass == this.loginForm.value.password){
          login=true;
          alert('Login Success!!!');
          localStorage.setItem('id',data[i].id)
          localStorage.setItem('name',data[i].firstname)
          console.log(data[i]);
          this.router.navigateByUrl('/home');
        } 
      }
      if(login == false){
        alert('Invalid Credentials');
      }
    });
  }
}
