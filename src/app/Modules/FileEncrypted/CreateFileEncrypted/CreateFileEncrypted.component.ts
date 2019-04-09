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

import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {CreateFileEncryptedService} from './CreateFileEncrypted.service';
import 'rxjs/add/operator/toPromise';
import {BottomToastsManager} from '../../../shared/CustomToaster';
import {IComponent} from '../../../shared/CodeInterface/IComponent.Component';
import {Employee} from '../../../bhyt.vn';
import {CreateUserService} from '../../Transaction/CreateUser/CreateUser.service';
import {UpdateUserService} from '../../Transaction/UpdateUser/UpdateUser.service';
import {FileService} from '../../../shared/file-browser/file/File.Service';
import {DirectoryService} from '../../../shared/file-browser/directory/directory.service';
import {FileBrowserService} from '../../../shared/file-browser/file-browser.service';
import {UserService} from '../../User/User.service';
import {RequestShareKeyEntity} from '../../ShareKey/RequestShareKey.entity';
import {EncryptFileEntity} from '../../EncryptFile/EncryptFile.entity';
import {ShareKeyService} from '../../ShareKey/ShareKey.service';
import {EncryptKeyService} from '../../EncryptKey/EncryptKey.service';
import {QueryService} from '../../Query.service';
import {IdentityService} from '../../../shared/management-component/identity/identity.service';
import {EncryptKeyEntity} from '../../EncryptKey/EncryptKey.entity';
import {DataEntity} from '../../../shared/material-component/inputfile/Data.Entity';
import {CreateFileService} from '../../Transaction/CreateFile/CreateFile.service';
import {UpdateFileService} from '../../Transaction/UpdateFile/UpdateFile.service';
import {ManagementService} from '../../../shared/management-component/management.service';

@Component({
	selector: 'app-create-file-encrypted',
	templateUrl: './CreateFileEncrypted.component.html',
	styleUrls: ['./CreateFileEncrypted.component.css'],
	providers: [CreateFileEncryptedService, CreateUserService, UpdateUserService, CreateFileService,
		UserService, QueryService, ShareKeyService, EncryptKeyService, IdentityService, UpdateFileService, FileService]
})
export class CreateFileEncryptedComponent extends IComponent<Employee> implements AfterViewInit {
	public numberSelected = 1;
	public activeNumber = 1;
	@ViewChild('modal') modal;
	@ViewChild('appEncrypted') appEncrypted;
	public inputRequired = '';
	public inputOptional = '';
	public requiredPeopleList: Array<any> = [];
	public optionalPeopleList = [];
	public threshHold = 0;
	@Output() finish = new EventEmitter<any>();
	@Input() public path = '';
	@Input() public isCreate = true;
	public encryptFileEntity: EncryptFileEntity;
	public control_info: any = {};
	public access_info = [];
	public file: DataEntity = new DataEntity();
	totalWait = 0;
	count = new EventEmitter<any>();

	constructor(public FileBrowserService: FileBrowserService, private FileService: FileService, private queryService: QueryService,
							private UserService: UserService, private shareKeyService: ShareKeyService, private encryptKeyService: EncryptKeyService,
							private DirectoryService: DirectoryService, toastr: BottomToastsManager, vcr: ViewContainerRef,
							public UpdateFileService: UpdateFileService,
							private IdentityService: IdentityService, public CreateFileService: CreateFileService) {
		super(toastr);
		this.count.subscribe(v => {
			this.totalWait--;
			if (this.totalWait == 0) {
				this.activeNumber = 3;
				this.toastr.ShowSuccess();
			}
		})
	}

	nextStep() {
		this.numberSelected++;
	}

	shareKey() {
		const optionalList = this.optionalPeopleList.filter(x => x.IsSelected);
		if (optionalList.length < this.threshHold) {
			this.toastr.ShowError('Ngưỡng phải nhỏ hơn hoặc bằng số người tùy chọn');
			return;
		}
		const requiredList = this.requiredPeopleList.filter(x => x.IsSelected);
		if (requiredList.some(x => {
			return optionalList.some(y => y.uid == x.uid);
		})) {
			this.toastr.ShowError('Lỗi: Một người không được nằm trong cả 2 danh sách');
			return;
		}
		const requestShareKeyEntity = new RequestShareKeyEntity();
		requestShareKeyEntity.threshHold = this.threshHold;
		requestShareKeyEntity.optional = optionalList.length;
		requestShareKeyEntity.required = requiredList.length;
		requestShareKeyEntity.input = this.encryptFileEntity.key;
		this.control_info.thresh_hold = this.threshHold;
		this.control_info.required_list = requiredList.map(x => 'resource:manager.User#' + x.uid);
		this.control_info.optional_list = optionalList.map(x => 'resource:manager.User#' + x.uid);
		this.shareKeyService.encrypt(requestShareKeyEntity).subscribe(x => {
			// const requiredKeyList = x.filter(y => y.isRequired);
			// const optionalKeyList = x.filter(y => !y.isRequired);
			this.totalWait += 999;
			this.IdentityService.getAll().subscribe(t => {
				let total = 0;
				this.access_info = [];
				for (let i = 0; i < requiredList.length; i++) {
					const b = requiredList[i];
					const c = [];
					const a = {user: 'resource:manager.User#' + encodeURIComponent(b.uid), crypto_list: c};
					const k = t.filter(u => u.participant == a.user && u.state.toString() == 'ACTIVATED');
					if (k.length == 0) {
						this.toastr.ShowError('Người dùng không có định danh hợp lệ');
						return;
					}
					total += k.length;
					k.forEach(r => {
						const d = new EncryptKeyEntity();
						d.certificate = r.certificate;
						d.data = JSON.stringify(x[i]);
						this.encryptKeyService.encrypt(d).subscribe(e => {
							c.push({
								public_key: d.certificate,
								encrypted_key: e.data,
								issuer: b['$class'] + '#' + b.uid,
								identity: r['$class'] + '#' + r.identityId
							});
							this.count.next();
						});
					});
					this.access_info.push(a);
				}
				for (let i = 0; i < optionalList.length; i++) {
					const b = optionalList[i];
					const c = [];
					const a = {user: 'resource:manager.User#' + b.uid, crypto_list: c};
					const k = t.filter(u => u.participant == a.user && u.state.toString() == 'ACTIVATED');
					if (k.length == 0) {
						this.toastr.ShowError('Người dùng không có định danh hợp lệ');
						return;
					}
					total += k.length;
					k.forEach(r => {
						const d = new EncryptKeyEntity();
						d.certificate = r.certificate;
						d.data = JSON.stringify(x[i + requiredList.length]);
						this.encryptKeyService.encrypt(d).subscribe(e => {
							c.push({
								public_key: d.certificate,
								encrypted_key: e.data,
								issuer: b['$class'] + '#' + b.uid,
								identity: r['$class'] + '#' + r.identityId
							});
							this.count.next();
						});
					});
					this.access_info.push(a);
				}
				this.totalWait += total - 999;
			});
			// this.encryptKeyService.encrypt()
		}, error1 => {
			this.toastr.ShowError(error1);
		});
	}

	choosePeople(data, isRequired) {
	}

	getPeopleList(search, isRequired) {
		this.UserService.getAll({'where': {'manager': false}}).subscribe(p => {
			let list = isRequired ? this.requiredPeopleList : this.optionalPeopleList;
			const ArrayName = [];
			for (const i of list) {
				if (i.IsSelected) {
					ArrayName.push(i);
				}
			}
			list = p;
			list = list.filter(x => x.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
			// TODO: Need to optimize
			let i = 0;
			let j = 0;
			while (i < ArrayName.length) {
				let t = j;
				let check = false;
				while (t < list.length) {
					if (ArrayName[i].uid == list[t].uid) {
						list[t].IsSelected = true;
						j = t;
						check = true;
						break;
					}
					t++;
				}
				if (!check) {
					list.push(ArrayName[i]);
				}
				i++;
			}
			if (isRequired) {
				this.requiredPeopleList = list;
			} else {
				this.optionalPeopleList = list;
			}

			// this.toastr.ShowSuccess();
		}, e => {
			this.toastr.ShowError(e);
		});
	}

	encryptSuccess($event) {
		this.encryptFileEntity = $event;
		if (this.isCreate) {
			this.path = this.path + this.file.name;
		}
		this.activeNumber = 2;
		this.toastr.ShowSuccess();
	}

	sendInfo() {
		let convert = this.path.split('/');
		convert = convert.map(x => encodeURIComponent(x));
		const path = convert.join('/');
		const x = {
			uid: path,
			access_info_list: this.access_info,
			control_info: this.control_info,
			meta_data: JSON.stringify({size: this.file.length}),
			checksum: this.encryptFileEntity.hash
		};
		if (this.isCreate) {
			this.CreateFileService.addTransaction(x).subscribe(t => {
				this.upload(x.uid, x.checksum, false);
			}, error1 => {
				this.toastr.ShowError(error1);
			});
		} else {
			this.UpdateFileService.addTransaction(x).subscribe(t => {
				this.upload(x.uid, x.checksum, true);
			}, error1 => {
				this.toastr.ShowError(error1);
			});
		}
	}


	upload(src, hash, isUpdate) {
		const ek = new EncryptKeyEntity();
		ek.privateKey = ManagementService.privateKey;
		const t: any = {
			certificate: ManagementService.publicKey,
			src: src,
			hash: hash
		};
		t.message = JSON.stringify(t);
		ek.data = t.message;
		this.encryptKeyService.sign(ek).subscribe(data => {
			t.sign = data.sign;
			const formData: FormData = new FormData();
			formData.append('json', JSON.stringify(t));
			formData.append('data', this.appEncrypted.data);
			this.FileService.upload(formData).subscribe(v => {
				this.activeNumber = 4;
				if (isUpdate) {
					this.toastr.ShowSuccess('File được tải lên hệ thống thành công!\n Đang chờ phê duyệt');
				} else {
					this.toastr.ShowSuccess('Tải file lên hệ thống thành công');
				}
			}, error1 => {
				this.toastr.ShowError(error1);
			});
		});
	}

	ngAfterViewInit(): void {
		this.modal.open();
	}
}
