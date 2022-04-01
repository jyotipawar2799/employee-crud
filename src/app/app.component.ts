import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'assignment';
  form:FormGroup;
  constructor(private frmb:FormBuilder){
    this.form=this.frmb.group({
      name:['']
    })
  }

  onSubmit()
  {
    console.log(this.form.value.name);
  }
}
