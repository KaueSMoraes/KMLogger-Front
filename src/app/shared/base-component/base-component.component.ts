import { Directive } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Directive()
export abstract class BaseComponent {

  constructor(protected snackBar: MatSnackBar, protected router: Router) {}

  showMessage(message: string, type: 'success' | 'error' | 'warning') {
    let panelClass = '';

    switch (type) {
      case "success":
        panelClass = "snackbar-success";
        break;
      case 'error':
        panelClass = "snackbar-error";
        break;
      case 'warning':
        panelClass = "snackbar-warning";
        break;
    }

    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: [panelClass],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
  protected navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
