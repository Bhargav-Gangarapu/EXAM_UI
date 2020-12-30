import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import {StudentExamService} from '../student-exam.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerStudent: FormGroup;
  submitted = false; 
  result:any;
  message:any;
  
  constructor(private formBuilder:FormBuilder,private stuService:StudentExamService) { }

  ngOnInit(): void {
    this.registerStudent = this.formBuilder.group(
      {
        FullName :['',Validators.required],
        UserName :['',Validators.required],
        Password:['',Validators.required] 
      }
    )
  }
  get l(){
    return this.registerStudent.controls;
  }
  studentRegister()
  {
      this.submitted = true;
      if (this.registerStudent.invalid) {
        return;
    }
    this.stuService.registerData(this.registerStudent.value).then(
    ( res:any)=>{ 
    this.result=res;
    if(res.success)
    {
    this.message=res.message; 
    this.submitted = false;
    this.registerStudent.reset();
    }
    },
    error=>
    {
      console.log('error***',error['error'].error,error['error'].error_description);
      this.message=error['error'].error_description; 
    }) 
  }
}
