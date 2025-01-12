import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  username: string | null = localStorage.getItem('username');
  message:string = '';
  constructor(private messageServices:MessageService, private authService: AuthService, private router: Router) {}
  sendMessage(){
    if(this.message.trim()){
      this.messageServices.sendMessage(this.message, this.username).subscribe({
        next: (response) =>{alert(`Message sent!`); this.message='';},
        error: (error) => {alert(`Error sending message: ${error}`);}
      }
      )
    }
    else{ alert("Your message cant be empty!");}
  }
  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
