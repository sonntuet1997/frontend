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

import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {WalletService} from './wallet.service';
import 'rxjs/add/operator/toPromise';
import {BottomToastsManager} from '../CustomToaster';
import {Router} from '@angular/router';
import {GetParticipantEnum, RoleList} from '../../GlobalData';
import {ManagementService} from '../management-component/management.service';
import {UserService} from '../../Modules/User/User.service';

@Component({
	selector: 'app-wallet',
	templateUrl: './wallet.component.html',
	styleUrls: ['./wallet.component.css'],
	providers: [WalletService, ManagementService, UserService]
})
export class WalletComponent implements OnInit {
	public title = 'Wallet';
	public deleteCardName = '';
	@ViewChild('file') file;
	public name = '';
	public allCards = [];

	constructor(private walletService: WalletService, public toastr: BottomToastsManager, fb: FormBuilder, public router: Router
		, private ManagementService: ManagementService, public UserService: UserService) {
	};

	ngOnInit(): void {
		this.loadAll();
	}

	loadAll() {
		return this.walletService.getAll()
			.subscribe((result) => {
				this.allCards = result;
				this.toastr.ShowSuccess('thành công!');
			}, error => {
				const er = error.error.error;
				const erArr = er.message.split(er.name);
				this.toastr.ShowError(erArr[erArr.length - 1]);
			});
	}

	active(name: string) {
		this.walletService.setDefault(name).subscribe(d => {
			this.ManagementService.ping().subscribe(res => {
				const sub = new EventEmitter();
				sub.subscribe(t => {
					this.toastr.ShowSuccess('Sử dụng với vai trò ' + t.name);
					WalletService.Role.emit(t);
					setTimeout(x => {
						this.router.navigate(['/']);
						// this.router.navigate(["/", {outlets: {login: null}}]);
					}, 300);
				});
				let role = GetParticipantEnum(res);
				if (role.value == 'User') {
					this.UserService.getAll({'where': {'manager': false}}).subscribe(x => {
						if (!x.some(t => t.uid == res.participant.split('#')[1])) {
							role = RoleList[1];
						}
						sub.next(role);
					})
				} else {
					sub.next(role);
				}
				this.ManagementService.reset();
			}, error => {
				const er = error.error.error;
				const erArr = er.message.split(er.name);
				this.toastr.ShowError(erArr[erArr.length - 1]);
			});
		}, error => {
			const er = error.error.error;
			const erArr = er.message.split(er.name);
			this.toastr.ShowError(erArr[erArr.length - 1]);
		});
	}

	openFileBrowser() {
		this.file.nativeElement.click();
	}

	importCard() {
		const formData: FormData = new FormData();
		const files = this.file.nativeElement.files;
		for (let i = 0; i < files.length; i++) {
			formData.append('card', files[i]);
		}
		this.walletService.importCard(this.name, formData).subscribe(x => {
			this.loadAll();
		})
	}

	deleteCard() {
		this.walletService.deleteCard(this.deleteCardName).subscribe(d => {
			this.loadAll();
		}, err => {
			this.toastr.ShowError(err);
		});
	}

	export(name) {
		window.open('/api/wallet/' + name + '/export', '_blank');
	}

	changeName(event) {
		const file = event.target.files[0];
		this.name = file == null ? '' : file.name;
	}

}
