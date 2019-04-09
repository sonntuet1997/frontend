import {Component} from '@angular/core';
import {HttpService} from '../HttpService';
// import {EmployeeInfoService} from '../EmployeeInfo.Service';
import {IEntity} from '../CodeInterface/IEntity.Entity';
import {ActivatedRoute, Router} from '@angular/router';
import {BottomToastsManager} from '../CustomToaster';
import {HttpClient} from '@angular/common/http';
import {interval} from 'rxjs/internal/observable/interval';
import {WalletService} from '../wallet/wallet.service';
// import {Http} from "@angular/http";
// import {AuthService} from "../../Modules/Auth/Auth.Service";
// import {UserEntity} from "../../Modules/User/User.Entity";
// import {UserService} from "../../Modules/User/User.Service";
// import { PermissionService } from "app/Modules/Permission/Permission.Service";

// import {LayerAccessControlEntity} from "../../Modules/LayerAccessControl/LayerAccessControl.Entity";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	LoginModel: LoginModel = new LoginModel();
	HttpService: HttpService<LoginModel>;

	constructor(public toastr: BottomToastsManager, public router: Router
		, httpClient: HttpClient
							// , public EmployeeInfoService: EmployeeInfoService
		, private route: ActivatedRoute) {
		this.route.queryParamMap.subscribe(params => {
			const action = params.get('action');
			if (action == 'logout') {
				this.setCookie('access_token', '', 0);
				this.toastr.ShowSuccess('Đăng xuất thành công!');
				WalletService.IsLogin.next(false);
			} else if (action == 'signin') {
				this.SignIn();
			}
		});
	}

	SignIn() {
		const loginTab = window.open('/auth/google', '_blank',
			'width=515,height=680,top=260,left=702,location=1,resizable=1,statusbar=1,toolbar=0');
		const spinner = document.getElementById('SpinnerBar');
		spinner.style.display = 'block';
		const result = interval(1000).subscribe(() => {
			try {
				if (loginTab.location.href == null) {
					result.unsubscribe();
					loginTab.close();
					spinner.style.display = 'none';
					this.toastr.ShowError('Đăng nhập thất bại');
					WalletService.IsLogin.next(false);
					return;
				}
				if (loginTab.location.href.indexOf('/assets/success.html')) {
					result.unsubscribe();
					loginTab.close();
					spinner.style.display = 'none';
					this.toastr.ShowSuccess('Đăng nhập thành công');
					this.router.navigate([{outlets: {login: 'wallet'}}]);
					WalletService.IsLogin.next(true);
					return;
				}
				if (loginTab.location.href.indexOf('/assets/error.html')) {
					result.unsubscribe();
					loginTab.close();
					spinner.style.display = 'none';
					this.toastr.ShowError('Đăng nhập thất bại');
					WalletService.IsLogin.next(false);
					return;
				}
			} catch (e) {
				return;
			}
		});
		// this.HttpService.Create(this.LoginModel).subscribe(res => {
		// 	const data = (res as any);
		// 	const UserInfo = this.DecodeUserInfo(data);
		// 	this.setCookie('EJWT', data.token, UserInfo.exp);
		// 	// this.EmployeeInfoService.GetCurrent();
		// 	this.toastr.ShowSuccess('Login success');
		// 	setTimeout(x => {
		// 		this.router.navigate([{outlets: {login: null}}]);
		// 	}, 300);
		// }, error2 => {
		// 	this.toastr.ShowError('Login failed!');
		// })
	}

	DecodeUserInfo(data) {
		const User = data.token.split('.')[1];
		if (User == null) {
			console.error('Cannot recognize JWT token!');
			return;
		}
		const user = JSON.parse(this.b64DecodeUnicode(User));
		console.log(user);
		return user;
	}

	setCookie(cname, cvalue, exp) {
		const d = new Date();
		d.setTime(d.getTime() + exp);
		const expires = 'expires=' + exp;
		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	}

	b64DecodeUnicode(str) {
		str = str.replace('-', '+').replace('_', '/');
		switch (str.length % 4) {
			case 0:
				break;
			case 2:
				str += '==';
				break;
			case 3:
				str += '=';
				break;
			default:
				throw new Error('Illegal base64url string!');
		}
		return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
		}).join(''))
	}
}

export class LoginModel extends IEntity {
	Username: string;
	Password: string;
}
