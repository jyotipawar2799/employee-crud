import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl=environment.apiUrl;

  constructor(private http:HttpClient) { }

  addManager(data:any)
  {
    return this.http.post(this.apiUrl+'manager',data);
  }
  getManagers(){
    return this.http.get(this.apiUrl+'manager');
  }

  addEmployee(data:any)
  {
    return this.http.post(this.apiUrl+'employee',data);
  }
  getEmployee()
  {
    return this.http.get(this.apiUrl+'employee');
  }
  
  getEmpDetails(empId: any)
  {
    return this.http.get(this.apiUrl+'employee/'+empId);
  }
  deleteEmployee(empId:any)
  {
    return this.http.delete(this.apiUrl+'employee/'+empId);
  }
  updateEmployee(data:any,id:any){
    return this.http.put(this.apiUrl+'employee/'+id,data);
  }
  
}
