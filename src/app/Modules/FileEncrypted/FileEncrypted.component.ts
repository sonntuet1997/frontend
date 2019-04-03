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

import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {FileEncryptedService} from './FileEncrypted.service';
import 'rxjs/add/operator/toPromise';
import {BottomToastsManager} from '../../shared/CustomToaster';
import {IComponent} from '../../shared/CodeInterface/IComponent.Component';
import {Employee, Log} from '../../bhyt.vn';
import {CreateUserService} from '../Transaction/CreateUser/CreateUser.service';
import {UpdateUserService} from '../Transaction/UpdateUser/UpdateUser.service';
import {FileBrowserEntity} from '../../shared/file-browser/file-browser.entity';
import {MenuItem} from 'primeng/primeng';
import {FileService} from '../../shared/file-browser/file/File.Service';
import {noop} from 'rxjs/util/noop';
import {DirectoryService} from '../../shared/file-browser/directory/directory.service';
import {FileEntity} from '../../shared/file-browser/file/File.Entity';
import {DirectoryEntity} from '../../shared/file-browser/directory/directory.entity';
import {Stack} from 'stack-typescript';
import {ManagementService} from '../../shared/management-component/management.service';
import {ProposeReadFileEncryptedService} from '../Transaction/ProposeReadFileEncrypted/ProposeReadFileEncrypted.service';
import {AcceptReadFileEncryptedService} from '../Transaction/AcceptReadFileEncrypted/AcceptReadFileEncrypted.service';
import {RejectReadFileEncryptedService} from '../Transaction/RejectReadFileEncrypted/RejectReadFileEncrypted.service';
import {EncryptKeyService} from '../EncryptKey/EncryptKey.service';
import {EncryptKeyEntity} from '../EncryptKey/EncryptKey.entity';
import {IdentityService} from '../../shared/management-component/identity/identity.service';
import {EncryptFileEntity} from '../EncryptFile/EncryptFile.entity';
import {ShareKeyService} from '../ShareKey/ShareKey.service';
import {LogService} from '../Log/Log.service';
import {ActionList} from '../../GlobalData';
import {AcceptProposedFileEncryptedService} from '../Transaction/AcceptProposedFileEncrypted/AcceptProposedFileEncrypted.service';
import {RejectProposedFileEncryptedService} from '../Transaction/RejectProposedFileEncrypted/RejectProposedFileEncrypted.service';
import {DeleteFileService} from '../Transaction/DeleteFile/DeleteFile.service';
import {EncryptFileService} from '../EncryptFile/EncryptFile.service';

@Component({
	selector: 'app-file-encrypted',
	templateUrl: './FileEncrypted.component.html',
	styleUrls: ['./FileEncrypted.component.css'],
	providers: [FileEncryptedService, CreateUserService, UpdateUserService, ManagementService, ProposeReadFileEncryptedService,
		AcceptReadFileEncryptedService, RejectReadFileEncryptedService, EncryptKeyService, IdentityService, ShareKeyService, LogService,
		AcceptProposedFileEncryptedService, RejectProposedFileEncryptedService, DeleteFileService, EncryptFileService
	]
})
export class FileEncryptedComponent extends IComponent<Employee> implements OnInit {
	CurrentFile: FileBrowserEntity = new FileBrowserEntity();
	CurrentFolder: FileBrowserEntity = new FileBrowserEntity();
	FileEntity: FileEntity = new FileEntity();
	fileBrowserEntities: FileBrowserEntity[] = [];
	folderBrowserEntities: FileBrowserEntity[] = [];
	itemsFolder: MenuItem[];
	itemsFile: MenuItem[];
	@ViewChild('fileInput') fileInput;
	@ViewChild('proposeFileModal') proposeFileModal;
	@ViewChild('fileProposed') fileProposed;
	@ViewChild('modal') modal;
	// @ViewChild('viewFileModal') viewFileModal;
	fileMap: string[];
	filePath = '';
	selectedFileEntities: FileBrowserEntity[] = [];
	@Output() onChanges: EventEmitter<any> = new EventEmitter();
	@Output() finish: EventEmitter<any> = new EventEmitter();
	@Input() Disabled = false;
	@Input() Multiple = true;
	temp: any;
	@Input() ModalSize = 'xxl';
	public previous = new Stack<any>();
	public post = new Stack<any>();
	fileInfo: any = {meta_data: {}, requiredPeopleList: [], optionalPeopleList: [], control_info: {}};
	proposedFile: any = {meta_data: {}, requiredPeopleList: [], optionalPeopleList: [], control_info: {}};
	isOpenCreate = false;
	isOpenEdit = false;
	editPath = '';
	public currentPing: any;
	public decryptFileEntity: EncryptFileEntity = new EncryptFileEntity();
	public currentLog: Log[] = [];
	public actionList = ActionList;
	private onTouchedCallback: () => void = noop;
	private onChangeCallback: (_: any) => void = noop;

	constructor(public fileEncryptedService: FileEncryptedService, private FileService: FileService,
							private ManagementService: ManagementService, public ProposeReadFileEncryptedService: ProposeReadFileEncryptedService,
							private DirectoryService: DirectoryService, toastr: BottomToastsManager, vcr: ViewContainerRef,
							private AcceptReadFileEncryptedService: AcceptReadFileEncryptedService, public EncryptKeyService: EncryptKeyService,
							private RejectReadFileEncryptedService: RejectReadFileEncryptedService, public IdentityService: IdentityService,
							public ShareKeyService: ShareKeyService, public LogService: LogService, public DeleteFileService: DeleteFileService,
							public AcceptProposedFileEncryptedService: AcceptProposedFileEncryptedService,
							public RejectProposedFileEncryptedService: RejectProposedFileEncryptedService, public EncryptFileService: EncryptFileService
	) {
		super(toastr);
		this.Search('/', true);
	}

	writeValue(obj: any): void {
		if (obj == null) {
			return;
		}
		this.temp = obj;
		const files = obj.split(';');
		this.selectedFileEntities = files.map(f => {
			if (f == '') {
				return;
			}
			const fbe = new FileBrowserEntity();
			fbe.Src = f;
			fbe.IsSelected = true;
			return fbe;
		}).filter(f => f != null);
		if (this.fileMap == null) {
			this.Search('/Files');
		} else {
			this.Search(this.fileMap.join('/'));
		}
	}

	registerOnChange(fn: any): void {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouchedCallback = fn;
	}

	ngOnInit() {
		this.itemsFolder = [
			{label: 'Sửa tên', icon: 'fa fa-plus', command: (event) => this.RenameFolder()},
			{label: 'Xóa', icon: 'fa fa-trash', command: (event) => this.DeleteFolder()}
		];
		this.itemsFile = [
			{label: 'Thay đổi file', icon: 'fa fa-plus', command: (event) => this.RenameFolder()},
			{label: 'Xóa', icon: 'fa fa-trash', command: (event) => this.DeleteFolder()},
			{
				label: 'Thuộc tính', icon: 'fa fa-info', command: (event) => {
					this.getFileDetail();
				}
			}
		];
	}

	getFileDetail(isOpened?) {
		let t = this.CurrentFile.Src.split('/');
		t = t.map(x => encodeURIComponent(x));
		const src = t.join('/');
		this.fileEncryptedService.getparticipant(src).subscribe(v => {
			v.uid = this.decodeSrc(v.uid);
			v.meta_data = JSON.parse(v.meta_data);
			v.requiredPeopleList = v.control_info.required_list.map(x => ({name: x.split('#')[1], IsSelected: true}));
			v.optionalPeopleList = v.control_info.optional_list.map(x => ({name: x.split('#')[1], IsSelected: true}));
			this.ManagementService.ping().subscribe(res => {
				this.currentPing = res;
				v.isAdmin = v.control_info.required_list.some(x => x == 'resource:' + this.currentPing.participant)
					|| v.control_info.optional_list.some(x => x == 'resource:' + this.currentPing.participant);
				v.status = 1;
				this.fileInfo = v;
				const accessInfo = v.access_info_list.find(t => t.user == 'resource:' + res.participant);
				if (accessInfo == null) {
					v.status = 3;
				} else {
					const cryptoList = accessInfo.crypto_list.filter(t => t.identity == 'resource:' + res.identity);
					v.cryptoList = cryptoList;
					let check = v.control_info.required_list.every(s => {
						return cryptoList.some(k => k.issuer == s);
					});
					check = check && (v.control_info.optional_list.filter(s => {
						return cryptoList.some(k => k.issuer == s);
					}).length >= v.control_info.thresh_hold);
					v.status = check ? 1 : 2;
				}
				if (!isOpened) {
					this.modal.open();
				}
			});
		});
	}

	Search(Url: string, isPre?: boolean) {
		this.fileEncryptedService.getAll().subscribe(x => {
			if (!isPre) {
				this.post = new Stack<any>();
				this.previous.push(this.filePath);
			}
			Url = this.decodeSrc(Url);
			x = x.map(y => {
				y.uid = this.decodeSrc(y.uid);
				return y;
			});
			this.filePath = Url[Url.length - 1] == '/' ? Url : Url + '/';
			this.filePath = this.filePath[0] == '/' ? this.filePath : '/' + this.filePath;
			let final = x.filter(t => {
				if (t.uid.indexOf(this.filePath) != 0) {
					return false;
				}
				return t.uid.substr(Url.length).indexOf('/') < 0;
			});
			this.fileBrowserEntities = final.map(k => {
				const t = new FileBrowserEntity();
				const a = k.uid.split('/');
				t.Name = a[a.length - 1];
				// t.Extension = 'xxcc';
				// t.Size = 2222;
				// t.LastModified = 'xxcc';
				t.Src = k.uid;
				return t;
			});
			final = x.filter(t => {
				if (t.uid.indexOf(this.filePath) != 0) {
					return false;
				}
				return t.uid.substr(Url.length).indexOf('/') > -1;
			});
			this.folderBrowserEntities = [];
			final.forEach(k => {
				const t = new FileBrowserEntity();
				const a = k.uid.substr(Url.length).split('/');
				t.Name = a[0];
				t.Src = Url + t.Name + '/';
				t.IsEdit = false;
				if (!this.folderBrowserEntities.some(f => f.Name == t.Name)) { this.folderBrowserEntities.push(t); }
			});
			let end = Url.length;
			if (Url[end - 1] == '/') {
				end = end - 1;
			}
			this.fileMap = Url.substring(0, end).split('/').filter(t => t != '');
		});
		// this.FileBrowserService.getFiles(Url).subscribe(x => {
		// 	let end = Url.length;
		// 	if (Url[end - 1] == '/') {
		// 		end = end - 1;
		// 	}
		// 	this.fileMap = Url.substring(0, end).split('/');
		// 	this.fileBrowserEntities = x;
		// 	if (IsCreate == true) {
		// 		for (const item of this.fileBrowserEntities) {
		// 			if (item.IsDirectory && item.Name === 'NewFolder') {
		// 				item.IsEdit = true;
		// 			}
		// 		}
		// 	}
		// 	this.fileBrowserEntities.forEach(f => {
		// 		f.IsSelected = this.selectedFileEntities.some(ff => {
		// 			return ff.Src == f.Src;
		// 		})
		// 	})
		// });
	}

	OpenContext(a, cm, file: FileBrowserEntity) {
		cm.show({
			pageX: a.pageX, pageY: a.pageY, preventDefault: () => {
			}
		});
		a.preventDefault();
		if (file.IsDirectory) {
			this.CurrentFolder = file;
		} else {
			Object.assign(this.CurrentFile, file);
		}
		// } else {
		// 	return;
		// }
	}

	goToDirectory(index) {
		let url = '/';
		if (index != null) {
			for (let i = 0; i <= index; i++) {
				url += this.fileMap[i] + '/';
			}
		}
		this.Search(url);
	}

	toggleFile(file: FileBrowserEntity) {
		if (file.IsSelected) {
			file.IsSelected = false;
			this.selectedFileEntities = this.selectedFileEntities.filter(f => {
				return f.Src != file.Src;
			})
		} else {
			if (this.Multiple == false) {
				this.fileBrowserEntities.forEach(fB => fB.IsSelected = false);
				this.selectedFileEntities = [];
			}
			file.IsSelected = true;
			this.selectedFileEntities.push(file);
		}
		this.onChanges.emit(file);
	}

	AddNewFolder() {
		const t = new FileBrowserEntity();
		t.Name = 'NewFolder';
		t.Src = this.fileMap.join('/') + '/NewFolder';
		t.Extension = 'new';
		t.IsDirectory = true;
		this.folderBrowserEntities.push(t);
	}

	RenameFolder() {
		this.CurrentFolder.IsEdit = true;
	}

	DeleteFolder() {
		const ConfirmBox = confirm('Bạn có chắc chắn muốn xóa thư mục này?');
		if (ConfirmBox) {
			const Directory = new DirectoryEntity();
			Directory.Path = this.fileMap.join('/') + '/' + this.CurrentFile.Name;
			this.DirectoryService.DeleteFolder(Directory).subscribe(res => {
				if (res) {
					this.Search(this.fileMap.join('/'));
					this.toastr.ShowSuccess();
				}
			}, () => {
				this.toastr.ShowError('Something went wrong');
			})
		}
	}

	PostNameFolder(FileEntity: FileBrowserEntity) {
		FileEntity.IsEdit = !FileEntity.IsEdit;
		const t = FileEntity.Src.split('/');
		t.splice(t.length - 1, 1);
		FileEntity.Src = t.join('/') + '/' + FileEntity.Name;
	}

	getBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result.substring(reader.result.indexOf(',') + 1, reader.result.length + 1));
			reader.onerror = error => reject(error);
		});
	}

	viewInfo() {
		const check = new EventEmitter();
		const arr = [];
		const cryptoList = this.fileInfo.access_info_list.find(o => o.user == 'resource:' + this.currentPing.participant)
			.crypto_list.filter(o => 'resource:' + this.currentPing.identity == o.identity);
		check.subscribe(f => {
			arr.push(f);
			if (arr.length == cryptoList.length) {
				const content = arr.map(t => JSON.parse(t.data));
				this.ShareKeyService.decrypt(content).subscribe(y => {
					const ek = new EncryptKeyEntity();
					ek.privateKey = ManagementService.privateKey;
					const t: any = {
						certificate: ManagementService.publicKey,
						src: this.fileInfo.uid,
						hash: this.fileInfo.checksum
					};
					t.message = JSON.stringify(t);
					ek.data = t.message;
					this.EncryptKeyService.sign(ek).subscribe(data => {
						t.sign = data.sign;
						let formData: FormData = new FormData();
						formData.append('json', JSON.stringify(t));
						this.FileService.download(formData).subscribe(x => {
							formData = new FormData();
							formData.append('key', y);
							formData.append('data', x);
							const q = this.fileInfo.uid.split('/');
							this.EncryptFileService.decrypt(formData).subscribe(x => {
								if (window.navigator.msSaveOrOpenBlob) {
									window.navigator.msSaveBlob(x, q[q.length - 1]);
								} else {
									const elem = window.document.createElement('a');
									elem.href = window.URL.createObjectURL(x);
									elem.download = q[q.length - 1];
									document.body.appendChild(elem);
									elem.click();
									document.body.removeChild(elem);
								}
								this.FileService.dataService.turnOffModal();
							}, error1 => {
								this.toastr.ShowError(error1);
							});
						});
					});
					// this.modal.close();
					// this.viewFileModal.open();
				}, error1 => {
					// this.decryptFileEntity = new EncryptFileEntity();
					// this.decryptFileEntity.key = error1.error.text;
					const ek = new EncryptKeyEntity();
					ek.privateKey = ManagementService.privateKey;
					const t: any = {
						certificate: ManagementService.publicKey,
						src: this.fileInfo.uid,
						hash: this.fileInfo.checksum
					};
					t.message = JSON.stringify(t);
					ek.data = t.message;
					this.EncryptKeyService.sign(ek).subscribe(data => {
						t.sign = data.sign;
						let formData: FormData = new FormData();
						formData.append('json', JSON.stringify(t));
						this.FileService.download(formData).subscribe(x => {
							formData = new FormData();
							formData.append('key', error1.error.text);
							formData.append('data', x);
							const q = this.fileInfo.uid.split('/');
							this.EncryptFileService.decrypt(formData).subscribe(x => {
								if (window.navigator.msSaveOrOpenBlob) {
									window.navigator.msSaveBlob(x, q[q.length - 1]);
								} else {
									const elem = window.document.createElement('a');
									elem.href = window.URL.createObjectURL(x);
									elem.download = q[q.length - 1];
									document.body.appendChild(elem);
									elem.click();
									document.body.removeChild(elem);
								}
								this.FileService.dataService.turnOffModal();
							}, error1 => {
								this.toastr.ShowError(error1);
							});
						});
					});
					// this.modal.close();
					// this.viewFileModal.open();
				})
			}
		});
		cryptoList.forEach(t => {
			const ek = new EncryptKeyEntity();
			ek.privateKey = ManagementService.privateKey;
			ek.data = t.encrypted_key;
			this.EncryptKeyService.decrypt(ek).subscribe(x => {
				check.next(x);
			})
		});
	}

	requestFile() {
		const propose = {uid: this.encodeSrc(this.CurrentFile.Src)};
		this.ProposeReadFileEncryptedService.addTransaction(propose).subscribe(() => {
			this.toastr.ShowSuccess('Thành công');
		});
	}

	save(T) {
		const x = Object.assign({}, T);
		x['Action'] = undefined;
		x['$class'] = undefined;
		x['department'] = undefined;
		if (T['Action'] == 'CREATE') {
			this.createService.addTransaction(x).subscribe(() => {
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
			this.updateService.addTransaction(x).subscribe(() => {
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

	backward() {
		const t = this.previous.pop();
		this.post.push(this.filePath);
		this.Search(t, true);
	}

	forward() {
		const t = this.post.pop();
		this.previous.push(this.filePath);
		this.Search(t, true);
	}

	needApprove(list) {
		const t = list.find(x => x.issuer == 'resource:' + this.currentPing.participant);
		return t == null || t.encrypted_key == '';
	}

	approveView(t) {
		const ek = new EncryptKeyEntity();
		ek.privateKey = ManagementService.privateKey;
		const accessInfo = this.fileInfo.access_info_list.find(t => t.user == 'resource:' + this.currentPing.participant);
		const cryptoInfo = accessInfo.crypto_list.find(t => t.issuer == 'resource:' + this.currentPing.participant
			&& 'resource:' + this.currentPing.identity == t.identity);
		ek.data = cryptoInfo.encrypted_key;
		this.EncryptKeyService.decrypt(ek).subscribe(rawKey => {
				this.IdentityService.getAll().subscribe(identities => {
					const k = identities.filter(u => u.participant == t.user && u.state.toString() == 'ACTIVATED');
					if (k.length == 0) {
						this.toastr.ShowError('Người dùng không có định danh hợp lệ');
						return;
					}
					const check = new EventEmitter();
					const list = [];
					check.subscribe(r => {
						list.push(r);
						if (list.length == k.length) {
							const q = new EventEmitter();
							let count = 0;
							q.subscribe(() => {
								count++;
								if (count == list.length) {
									this.getFileDetail();
								}
							});
							const trans = {
								uid: this.encodeSrc(this.CurrentFile.Src),
								'access_info': {
									user: t.user,
									crypto_list: list
								}
							};
							this.AcceptReadFileEncryptedService.addTransaction(trans).subscribe(() => {
								this.getFileDetail(true);
							});
						}
					});
					k.forEach(r => {
						const d = new EncryptKeyEntity();
						d.certificate = r.certificate;
						d.data = rawKey.data;
						this.EncryptKeyService.encrypt(d).subscribe(e => {
							check.next({
								public_key: d.certificate,
								encrypted_key: e.data,
								issuer: 'resource:' + this.currentPing.participant,
								identity: r['$class'] + '#' + r.identityId
							});
						});
					});
				});
			}
		);
	}

	rejectView(t) {
		this.IdentityService.getAll().subscribe(identities => {
			const k = identities.filter(u => u.participant == t.user);
			if (k.length == 0) {
				this.toastr.ShowError('Người dùng không có định danh hợp lệ');
				return;
			}
			const crypto_list = k.map(y => {
				return {
					issuer: 'resource:' + this.currentPing.participant,
					identity: y['$class'] + '#' + y.identityId,
					public_key: y.certificate,
					encrypted_key: '',
				}
			});
			const trans = {
				uid: this.encodeSrc(this.CurrentFile.Src),
				'access_info': {
					user: t.user,
					crypto_list: crypto_list
				}
			};
			this.RejectReadFileEncryptedService.addTransaction(trans).subscribe(() => {
				this.getFileDetail(true);
			});
		});
	}

	viewLog() {
		const src = this.encodeSrc(this.fileInfo.uid);
		const a = {where: {file: 'resource:' + this.fileInfo['$class'] + '#' + encodeURI(src)}};
		this.LogService.getAll(a).subscribe(x => {
			this.currentLog = x.sort((a, b) => {
				return new Date(a.timestamp).getMilliseconds() - new Date(b.timestamp).getMilliseconds();
			});
			this.currentLog.forEach(t => {
				t.action = this.actionList.find(g => g.value == t.action).name;
			});
		});
	}


	approveFileChange(t) {
		const x = {
			timestamp_id: t.timestamp,
			uid: this.encodeSrc(this.fileInfo.uid)
		};
		this.AcceptProposedFileEncryptedService.addTransaction(x).subscribe(b => {
			this.getFileDetail(true);
			this.toastr.ShowSuccess('Thành công!');
		});
	}

	rejectFileChange(t) {
		const x = {
			timestamp_id: t.timestamp,
			uid: this.encodeSrc(this.fileInfo.uid)
		};
		this.RejectProposedFileEncryptedService.addTransaction(x).subscribe(b => {
			this.getFileDetail(true);
			this.toastr.ShowSuccess('Thành công!');
		});
	}

	needAccept(list) {
		const t = list.proposing_file.vote_result_list.find(x => x.user == 'resource:' + this.currentPing.participant);
		return t == null || !t.is_accept;
	}

	deleteFile(t) {
		const e = {uid: this.encodeSrc(t.uid)};
		this.DeleteFileService.addTransaction(e).subscribe(x => {
			this.getFileDetail(true);
			this.toastr.ShowSuccess('Thành công!');
		});
	}

	download() {
		const formData: FormData = new FormData();
		formData.append('src', '8ee19d8d9946e93901dd7af5fe039f2778d116a8ieltS.odt');
		this.FileService.download(formData).subscribe(x => {
			if (window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveBlob(x, 'dasdas');
			} else {
				const elem = window.document.createElement('a');
				elem.href = window.URL.createObjectURL(x);
				elem.download = 'asdasdasd';
				document.body.appendChild(elem);
				elem.click();
				document.body.removeChild(elem);
			}
			this.FileService.dataService.turnOffModal();
		}, error1 => {
			this.toastr.ShowError(error1);
		});
	}


	encodeSrc(Src) {
		let t = Src.split('/');
		t = t.map(x => encodeURIComponent(x));
		return t.join('/');
	}

	decodeSrc(Src) {
		let t = Src.split('/');
		t = t.map(x => decodeURIComponent(x));
		return t.join('/');
	}

	openProposedFile(t) {
		this.proposedFile = t.proposing_file;
		this.proposedFile.uid = this.decodeSrc(this.proposedFile.uid);
		this.proposedFile.meta_data = JSON.parse(this.proposedFile.meta_data);
		this.proposedFile.requiredPeopleList = this.proposedFile.control_info.required_list.map(x => ({
			name: x.split('#')[1],
			IsSelected: true
		}));
		this.proposedFile.optionalPeopleList = this.proposedFile.control_info.optional_list.map(x => ({
			name: x.split('#')[1],
			IsSelected: true
		}));
		// this.ManagementService.ping().subscribe(res => {
		// 	this.currentPing = res;
		// 	v.isAdmin = v.control_info.required_list.some(x => x == 'resource:' + this.currentPing.participant)
		// 		|| v.control_info.optional_list.some(x => x == 'resource:' + this.currentPing.participant);
		// 	v.status = 1;
		// 	this.fileInfo = v;
		// 	const accessInfo = v.access_info_list.find(t => t.user == 'resource:' + res.participant);
		// 	if (accessInfo == null) {
		// 		v.status = 3;
		// 	} else {
		// 		const cryptoList = accessInfo.crypto_list.filter(t => t.identity == 'resource:' + res.identity);
		// 		v.cryptoList = cryptoList;
		// 		let check = v.control_info.required_list.every(s => {
		// 			return cryptoList.some(k => k.issuer == s);
		// 		});
		// 		check = check && (v.control_info.optional_list.filter(s => {
		// 			return cryptoList.some(k => k.issuer == s);
		// 		}).length >= v.control_info.thresh_hold);
		// 		v.status = check ? 1 : 2;
		// 	}
		// 	if (!isOpened) {
		// 		this.modal.open();
		// 	}
		// });
		this.proposeFileModal.close(true);
		this.fileProposed.open();
	}
}
