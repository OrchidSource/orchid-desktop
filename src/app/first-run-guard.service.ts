import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

/**
 * Guard service to be used in router. Checks if the user has had the first-run
 * experience, and if not, forwards the user to the first-launch page
 * @return [description]
 */
@Injectable()
export class FirstRunGuardService implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
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