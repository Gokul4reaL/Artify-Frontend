import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GrowlService } from 'src/app/shared/growl.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService, private growlService: GrowlService) {}

  login() {
    // Call the login service with the provided username and password
    const payload = {
      username : this.username,
      password : this.password
    }

    this.userService.login(payload).subscribe(
      (response: any) => {
        if(typeof response === 'string')
        {
          const tokenParts = response.split('.');
          const encodedPayload = tokenParts[1];
          const decodedPayload = JSON.parse(atob(encodedPayload));
          
          if(decodedPayload.data.message === 'success')
          {
            // Store token in local storage
          localStorage.setItem('token', `${tokenParts[0]}.${tokenParts[1]}.${tokenParts[2]}`);
          localStorage.setItem('userId', decodedPayload.data.userId);
          this.growlService.showGrowl('success', 'Login Successful !!!');
          if(decodedPayload.data.user_profile)
          {
            this.router.navigate(['/dashboard']);
          }
          else {
            this.router.navigate(['/create-profile']);
          }
        }
        else {
          this.growlService.showGrowl('error', 'Incorrect Credentials !!!');
        }
      } else {
        this.growlService.showGrowl('error', 'Invalid Credentials !!!')
      }
    },
      (error: any) => {
        this.growlService.showGrowl('error', 'Login Failed, Try Again !!!');
      }
    );
  }
}
