import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
// import {EmployeeInfoService} from '../shared/EmployeeInfo.Service';

// import {AuthService} from './Modules/Auth/Auth.Service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		// private EmployeeInfoService: EmployeeInfoService,
		private router: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const url: string = state.url;
		// if (this.EmployeeInfoService.GetCurrent() == null) {
		// 	setTimeout(x => {
		// 		this.router.navigate([{outlets: {login: 'login'}}]);
		// 	}, 100);
		// }
		return true;
		//        return this.authService.GetTypeOfLayout('',url).Ty == 'Show';
	}
}
