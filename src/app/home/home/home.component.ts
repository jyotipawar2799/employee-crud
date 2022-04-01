import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  display = 'none';
  empForm: FormGroup;
  response: any;
  empDetails: any;
  data: any = [];
  modalTitle = '';
  empId = '';

  constructor(
    private frmb: FormBuilder,
    private apiService: ApiService,
    public router: Router
  ) {
    this.empForm = this.frmb.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      address: ['',Validators.required],
      birthdate: ['',Validators.required],
      mobile: ['',Validators.required],
      city: ['',Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchData();
    var panno = CryptoJS.AES.encrypt("FEAPS8905Q", "myPassword").toString();

  }

  onSubmit() { 
    if (this.empId == '') {
      // Add Employee
      this.apiService.addEmployee(this.empForm.value).subscribe((res) => {
        this.response = res;
        console.log(this.response);
        alert('Employee Added Successfully');
        this.onCloseHandled();
        this.fetchData();
      });
    } else {
      //Edit Employee
      this.apiService
        .updateEmployee(this.empForm.value, this.empId)
        .subscribe((res) => {
          this.response = res;
          console.log(this.response);
          alert('Record Updated Successfully');
          this.onCloseHandled();
          this.fetchData();
        });
    }
  }

  fetchData() {
    this.apiService.getEmployee().subscribe((res) => {
      this.response = res;
      this.data = this.response;
      console.log(this.response);
    });
  }

  editEmployee(id: any) {
    this.display = 'block';
    this.modalTitle = 'Edit Employee';
    this.apiService.getEmpDetails(id).subscribe((res) => {
      this.response = res;
      this.empId = this.response.id;
      this.empForm.setValue({
        firstname: this.response.firstname,
        lastname: this.response.lastname,
        address: this.response.address,
        mobile: this.response.mobile,
        birthdate: this.response.birthdate,
        city: this.response.city,
      });
    });
  }

  onDelete(id: any) {
    if (confirm('Are you sure want to delete this employee?')) {
      this.apiService.deleteEmployee(id).subscribe((res) => {
        this.response = res;
        console.log(this.response);
        this.fetchData();
      });
    }
  }

  openModal() {
    this.display = 'block';
    this.modalTitle = 'Add Employee';
    this.empId = '';
  }

  onCloseHandled() {
    this.display = 'none';
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
