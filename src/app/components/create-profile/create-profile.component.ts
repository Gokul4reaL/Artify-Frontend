import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GrowlService } from 'src/app/shared/growl.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.less']
})

export class CreateProfileComponent {
    fullName : string = '';
    country: string = '';
    username: string = '';
    day: string = '';
    month: string = '';
    year: string = '';    
    gender: string = '';
    profilePhoto: string = '';
    acceptTerms: boolean = true
    userId = localStorage.getItem('userId');

    constructor(private userService : UserService, private growlsService : GrowlService, private router : Router)
    {}

  createprofile()
  {
    const payload = {
      fullName : this.fullName,
      country : this.country,
      username : this.username,
      day : this.day,
      month : this.month,
      year : this.year,
      gender : this.gender,
      profilePhoto : this.profilePhoto,
      user_id : this.userId
    }

    const userPayload = {
      username : this.username
    }

    if (this.acceptTerms) {
      this.userService.checkUserName(userPayload).subscribe((response: any) => {
        const existingUserName: boolean = response;
        if (!existingUserName) {
          // Username does not exist, proceed with creating a new profile
          this.userService.createProfile(payload).subscribe(
            (response: any) => {
              console.log('Response: ', response);
              if (response === 'success') {
                this.growlsService.showGrowl(
                  'success',
                  'Profile Updated Successfully !!!'
                );
                this.router.navigate(['dashboard']);
              } else {
                this.growlsService.showGrowl(
                  'error',
                  'Something wrong happened. Please try again !!!'
                );
              }
            },
            (error: any) => {
              this.growlsService.showGrowl('error', error.message);
            }
          );
        } else {
          // Username already exists, show an error message
          this.growlsService.showGrowl('error', 'Username already exists !!!');
        }
      });
    }    
    
  }

}
