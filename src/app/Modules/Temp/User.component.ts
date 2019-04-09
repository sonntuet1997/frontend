/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component} from '@angular/core';
import {UserService} from './User.service';
import 'rxjs/add/operator/toPromise';
import {BottomToastsManager} from '../../shared/CustomToaster';
import {IComponent} from '../../shared/CodeInterface/IComponent.Component';
import {Employee} from '../../bhyt.vn';
import {SexList} from '../../GlobalData';
import {CreateUserService} from '../Transaction/CreateUser/CreateUser.service';
import {UpdateUserService} from '../Transaction/UpdateUser/UpdateUser.service';

@Component({
	selector: 'app-employee',
	templateUrl: './User.component.html',
	styleUrls: ['./User.component.css'],
	providers: [UserService, CreateUserService, UpdateUserService]
})
export class UsersComponent extends IComponent<Employee> {
	public title = 'Người dùng';
	public SexList = SexList;

	constructor(userService: UserService, toastr: BottomToastsManager, create: CreateUserService,
							update: UpdateUserService) {
		super(toastr);
		this.getService = userService;
		this.createService = create;
		this.updateService = update;
		this.search();
	};

	save(T) {
		const x = Object.assign({}, T);
		x['Action'] = undefined;
		x['$class'] = undefined;
		x['department'] = undefined;
		if (T['Action'] == 'CREATE') {
			this.createService.addTransaction(x).subscribe(p => {
				// if (this.entities != null) {
				// 	this.entities[0] = x;
				// } else {
				// 	T = x;
				// }
				// this.toastr.ShowSuccess();
				this.search();
			}, e => {
				const er = e.error.error;
				const erArr = er.message.split(er.name);
				this.toastr.ShowError(erArr[erArr.length - 1]);
			});
		} else {
			this.updateService.addTransaction(x).subscribe(p => {
				if (this.entities != null) {
					this.entities[this.tempIndex] = x;
					x.issuer = T.issuer;
				} else {
					T = x;
				}
				this.toastr.ShowSuccess();
			}, e => {
				const er = e.error.error;
				const erArr = er.message.split(er.name);
				this.toastr.ShowError(erArr[erArr.length - 1]);
			});
		}
	}
}
