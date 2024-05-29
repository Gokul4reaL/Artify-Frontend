import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { GrowlService } from 'src/app/shared/growl.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private adminService: AdminService, private growlService: GrowlService) {}

  adminLogin() {
    // Call the login service with the provided username and password
    const payload = {
      username : this.username,
      password : this.password
    }

    this.adminService.login(payload).subscribe(
      (response: any) => {
        if(typeof response === 'string')
        {
          const tokenParts = response.split('.');
          const encodedPayload = tokenParts[1];
          const decodedPayload = JSON.parse(atob(encodedPayload));
          
          if(decodedPayload.data.message === 'success')
          {
            // Store token in local storage
          localStorage.setItem('adminToken', `${tokenParts[0]}.${tokenParts[1]}.${tokenParts[2]}`);
          localStorage.setItem('adminId', decodedPayload.data.userId);
          this.growlService.showGrowl('success', 'Login Successful !!!');
          if(decodedPayload.data.user_profile)
          {
            this.router.navigate(['/admin/dashboard']);
          }
          else {
            this.router.navigate(['/admin/create-profile']);
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
