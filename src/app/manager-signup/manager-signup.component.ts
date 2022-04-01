import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-manager-signup',
  templateUrl: './manager-signup.component.html',
  styleUrls: ['./manager-signup.component.scss']
})
export class ManagerSignupComponent implements OnInit {
  signupForm:FormGroup;
  secret='SECRET';

  constructor(private frmb:FormBuilder,
              private apiservice:ApiService,
              private router:Router) {
    this.signupForm=this.frmb.group({
      firstname:['',[Validators.required]],
      lastname:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required]],
      address:['',[Validators.required]],
      birthdate:['',[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  onSignUp()
  { 
    // - Handle error scenarios if email id is already present
    // its simple but  time problem ?
    let password = CryptoJS.AES.encrypt(this.signupForm.value.password.trim(), 
                                        this.secret.trim()).toString();
    let data=this.signupForm.value;
    data.password=password;

    this.apiservice.addManager(data).subscribe(
      res=>{
        console.log(res);
        alert("Manager Signup Successfully");
        this.router.navigateByUrl('/');
      })
  } 
}
