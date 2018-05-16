import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class FirstRunGuardService implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('firstRun?????')
    /* TODO: use proper settings location */
    const  firstRunRan = window.localStorage.getItem('FIRST_RUN_RAN');
    if (firstRunRan) {
      return true;
    } else {
      window.localStorage.setItem('FIRST_RUN_RAN', '1');
      this.router.navigate(['/first-launch']);
      return false;
    }
  }

}
