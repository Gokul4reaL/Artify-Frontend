import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GrowlService {

  constructor(private snackBar: MatSnackBar) {}

  showGrowl(type: 'success' | 'warning' | 'error', message: string): void {
    let config: MatSnackBarConfig = {};
    
    switch (type) {
      case 'success':
        config = {
          panelClass: ['growl-success'],
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 2000
        };
        break;
      case 'warning':
        config = {
          panelClass: ['growl-warning'],
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000
        };
        break;
      case 'error':
        config = {
          panelClass: ['growl-danger'],
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000
        };
        break;
      default:
        throw Error(`Unsupported growl type: ${type}`);
    }

    this.snackBar.open(message, '', config);
  }
}