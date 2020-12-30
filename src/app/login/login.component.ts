import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import {StudentExamService} from '../student-exam.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginStudent: FormGroup;
  submitted = false;
  isLoginFailed = false;
  isLoggedIn = true;
  result:any;
  message:any;
  
  constructor(private formBuilder:FormBuilder,private stuService:StudentExamService,private router:Router) { }
  get l(){
    return this.loginStudent.controls;
  }
  ngOnInit(): void {
    this.loginStudent = this.formBuilder.group(
      {    
        UserName :['',Validators.required],
        Password:['',Validators.required] 
      }
    )
  }
  loginStudentforExm()
  {
    this.submitted = true;   
      if (this.loginStudent.invalid) {
        return;
    }
    this.stuService.loginData(this.loginStudent.value).then(
      ( res:any)=>{ 
      this.result=JSON.stringify(res);
      debugger;
      console.log(JSON.stringify(res)
        );
      console.log(res.result["User_ID"]);
      if(res.success)
      {
      this.router.navigate(['/home']); 
        window.sessionStorage.setItem("userId", res.result[0]["User_ID"]);
        window.sessionStorage.setItem("userName", res.result[0]["FullName"]);
      }
      else
      this.message=res.message;
      },
      error=>
      {
        console.log('error***',error['error'].error,error['error'].error_description);
        this.message=error['error'].error_description; 
      }) 
  }

}
