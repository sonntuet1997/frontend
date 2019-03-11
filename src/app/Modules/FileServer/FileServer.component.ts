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
import {FileServerService} from './FileServer.service';
import 'rxjs/add/operator/toPromise';
import {BottomToastsManager} from '../../shared/CustomToaster';
import {IComponent} from '../../shared/CodeInterface/IComponent.Component';
import {User} from '../../bhyt.vn';
import {SexList} from '../../GlobalData';
import {CreateUserService} from '../Transaction/CreateUser/CreateUser.service';
import {UpdateUserService} from '../Transaction/UpdateUser/UpdateUser.service';
import {Router} from '@angular/router';
import {CreateFileServerService} from '../Transaction/CreateFileServer/CreateFileServer.service';
import {UpdateFileServerService} from '../Transaction/UpdateFileServer/UpdateFileServer.service';

@Component({
	selector: 'app-file-server',
	templateUrl: './FileServer.component.html',
	styleUrls: ['./FileServer.component.css'],
	providers: [FileServerService, CreateFileServerService, UpdateFileServerService]
})
export class FileServerComponent extends IComponent<User> {
	public title = 'Hệ thống File';
	public SexList = SexList;

	constructor(userService: FileServerService, toastr: BottomToastsManager, create: CreateFileServerService,
							update: UpdateFileServerService, private router: Router) {
		super(toastr);
		this.title = this.router.url.indexOf('Admin') > 0 ? 'Quản trị người dùng' : 'Người dùng';
		this.getService = userService;
		this.createService = create;
		this.updateService = update;
		this.search();
	};

	search() {
		// SearchEntity.Skip = IsPaging ? this.PagingModel.Take * this.PagingModel.Active : 0;
		// SearchEntity.Take = this.PagingModel.Take;
		const param = this.title == 'Người dùng' ? {'where': {'manager': false}} : {'where': {'manager': true}};
		this.getService.getAll(param).subscribe(p => {
			this.entities = p;
			this.toastr.ShowSuccess();
		}, e => {
			this.toastr.ShowError(e);
		});
		// this.Count(SearchEntity);
	}

	save(T) {
		const x = Object.assign({}, T);
		x['Action'] = undefined;
		x['$class'] = undefined;
		x['admin'] = undefined;
		x['issuer'] = undefined;
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
