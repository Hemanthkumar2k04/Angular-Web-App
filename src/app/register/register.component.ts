import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup
  username: string = "";
  password: string = "";
  password_check: string = "";
  constructor(private router: Router, private signup: SignupService, private toaster: ToastrService){
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
  {validators: this.passwordMatchValidator})
  };
  passwordMatchValidator(group: AbstractControl):{[key:string]: boolean} | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
  onSubmit(): void{
    if(!this.username || !this.password || !this.password_check){
      this.toaster.warning("All the fields are required!")
    }
    if(!!this.password && (this.password === this.password_check)){
      this.signup.signup(this.username, this.password).subscribe({
        next: (response) => {
          this.toaster.success("Registration Successful!")
          localStorage.clear();
          localStorage.setItem('username', this.username);
          this.router.navigate(['home']);
        },
        error: (error: HttpErrorResponse) => {
          this.toaster.error(`${error.error['message']}`)        
        }
      });
    }
  }
}
