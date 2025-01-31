import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  username: string | null = localStorage.getItem('username');
  message:string = '';
  constructor(private messageServices:MessageService, private authService: AuthService, private router: Router, private toaster: ToastrService) {}
  navigateToPage(){
    this.router.navigate(['account']);
  }
  sendMessage(){
    if(this.message.trim()){
      this.messageServices.sendMessage(this.message, this.username).subscribe({
        next: (response) =>{this.toaster.success("message"); this.message='';},
        error: (error) => {this.toaster.error(`Error sending message: ${error}`);}
      }
      )
    }
    else{ this.toaster.warning("Message cant be empty");}
  }
  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
