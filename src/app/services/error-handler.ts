import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AUTH_STATE} from '../authentication/auth.component';

@Injectable()

export class ErrorsHandleService implements ErrorHandler {
  constructor(private injector: Injector) {

  }

  public handleError(error: Error | HttpErrorResponse) {
    const router = this.injector.get(Router);
    console.log(error)
    if (error instanceof HttpErrorResponse) {
      console.log('some errors', error);
      switch (error.status) {
        case 400 :
          if (error.message === 'Invalid Credentials') {
            console.log('PAROL ILI LOGIN OWIBKA !!!');
          }
          // localStorage.clear();
          // AUTH_STATE.next(false);
          // router.navigate(['']).catch();
          break;
        case 401 :
          localStorage.clear();
          AUTH_STATE.next(false);
          router.navigate(['']).catch();
          break;
      }
    }
  }
}
