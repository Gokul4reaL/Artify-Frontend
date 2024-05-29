import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { GrowlService } from 'src/app/shared/growl.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {

  email: string = '';
  mobileNumber: string = '';
  password: string = '';
  confirmPassword: string = '';
  user_type: string = 'admin';

  constructor(private adminService : AdminService, private router: Router, private growlService: GrowlService) { }

  adminRegister() {
    if (!this.email || !this.mobileNumber || !this.password || !this.confirmPassword) {
      this.growlService.showGrowl('warning', 'Please fill in all fields !!!');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.growlService.showGrowl('warning', 'Passwords do not match !!!');
      return;
    }

    const payload = {
      email : this.email,
      mobileNumber : this.mobileNumber,
      password : this.password,
      user_type : this.user_type
    }

    this.adminService.register(payload).subscribe((response: any) => {
          console.log('Response:', response);
          if(response === 'Success') {
            this.growlService.showGrowl('success', 'Registration Successful !!!');
            this.router.navigate(['/admin']);
          }
          else if(response === 'Email and Mobile') {
            this.growlService.showGrowl('warning', 'Both Email and Mobile Number Already Exists !!!');
          }
          else if(response === 'Email') {
            this.growlService.showGrowl('warning', 'Email Already Exists !!!');
          }
          else if(response === 'Mobile') {
            this.growlService.showGrowl('warning', 'Mobile Number Already Exists !!!');
          }
          else{
            this.growlService.showGrowl('error', 'Something Wrong Happened, Please Try Again !!!');
          }
        },
        ( error: any) => {
          this.growlService.showGrowl('error', 'Registration Failed !!!');
          // Handle error (e.g., display error message)
        }
      );
  }

}
