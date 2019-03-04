// import 'rxjs/Rx';
// import {Injectable} from '@angular/core';
// import {EmployeeEntity} from '../app/Modules/Employee/Employee.Entity';
//
// @Injectable()
// export class EmployeeInfoService {
// 	EmployeeEntity: EmployeeEntity;
//
// 	constructor() {
//
// 	}
//
// 	GetCurrent(): EmployeeEntity {
// 		// if (this.UserEntity == null) {
// 		const EJWT = this.GetCookie('EJWT');
// 		const User = this.DecodeUserInfo(EJWT);
// 		if (User == null) { return null; }
// 		this.EmployeeEntity = User.UserEntity;
// 		// }
// 		return this.EmployeeEntity;
// 	}
//
// 	GetCookie(cname) {
// 		const name = cname + '=';
// 		const decodedCookie = decodeURIComponent(document.cookie);
// 		const ca = decodedCookie.split(';');
// 		for (let i = 0; i < ca.length; i++) {
// 			let c = ca[i];
// 			while (c.charAt(0) == ' ') {
// 				c = c.substring(1);
// 			}
// 			if (c.indexOf(name) == 0) {
// 				return c.substring(name.length, c.length);
// 			}
// 		}
// 		return '';
// 	}
//
// 	DecodeUserInfo(data) {
// 		const User = data.split('.')[1];
// 		if (User == null) {
// 			console.error('Cannot recognize JWT token!');
// 			return null;
// 		}
// 		const user = JSON.parse(this.b64DecodeUnicode(User));
// 		console.log(user);
// 		return user;
// 	}
//
// 	b64DecodeUnicode(str) {
// 		str = str.replace('-', '+').replace('_', '/');
// 		switch (str.length % 4) {
// 			case 0:
// 				break;
// 			case 2:
// 				str += '==';
// 				break;
// 			case 3:
// 				str += '=';
// 				break;
// 			default:
// 				throw new Error('Illegal base64url string!');
// 		}
// 		return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
// 			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
// 		}).join(''))
// 	}
// }
