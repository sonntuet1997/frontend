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

import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {EncryptFileService} from './EncryptFile.service';
import 'rxjs/add/operator/toPromise';
import {BottomToastsManager} from '../../shared/CustomToaster';
import {DataEntity} from '../../shared/material-component/inputfile/Data.Entity';
import {EncryptFileEntity} from './EncryptFile.entity';
import {InputfileComponent} from '../../shared/material-component/inputfile/inputfile.component';

@Component({
	selector: 'app-encryptfile',
	templateUrl: './EncryptFile.component.html',
	styleUrls: ['./EncryptFile.component.css'],
	providers: [EncryptFileService]
})
export class EncryptFileComponent {
	public title = 'Mã hóa';
	@Input() public file: DataEntity = new DataEntity();
	public file2: DataEntity = new DataEntity();
	public encryptFileEntity: EncryptFileEntity;
	@Input() public decryptFileEntity: EncryptFileEntity = new EncryptFileEntity();
	@Input() type: string;
	@Output() encryptSuccess = new EventEmitter();
	@ViewChild('enc') enc: InputfileComponent;
	@ViewChild('dec') dec: InputfileComponent;
	public data: Uint8Array;
	public status = false;

	constructor(public encryptFileService: EncryptFileService, public toastr: BottomToastsManager) {
	};

	fileChange() {
		this.encryptFileEntity = null;
	}

	encrypt() {
		const formData: FormData = new FormData();
		const files = this.enc.file.nativeElement.files;
		for (let i = 0; i < files.length; i++) {
			formData.append('data', files[i]);
		}
		const c = new EventEmitter();
		let count = 0;
		c.subscribe(p => {
			count++;
			if (count == 2) {
				this.status = false;
				this.encryptSuccess.next(this.encryptFileEntity);
			}
		});
		const d = new Date();
		this.encryptFileEntity = new EncryptFileEntity();
		this.enc.hash().subscribe(v => {
			this.encryptFileEntity.hash = v;
			// this.encryptFileEntity.hash = this.encryptFileEntity.key.substr(this.encryptFileEntity.key.indexOf(',') + 1);
			c.next();
			const e = new Date();
			console.log(e.getMilliseconds() - d.getMilliseconds());
		});
		this.encryptFileService.encrypt(formData).subscribe(x => {
			this.data = x.slice(32);
			const keyReader = new FileReader();
			keyReader.onloadend = () => {
				this.encryptFileEntity.key = btoa(keyReader.result);
				this.encryptFileEntity.key = this.encryptFileEntity.key.substr(this.encryptFileEntity.key.indexOf(',') + 1);
				c.next();
			};
			keyReader.readAsBinaryString(x.slice(0, 32));
			// const hashReader = new FileReader();
			// hashReader.onloadend = () => {
			// };
			// hashReader.readAsBinaryString(x.slice(x.size - 32));
		}, error1 => {
			this.toastr.ShowError(error1);
		});
	}

	decrypt() {
		const formData: FormData = new FormData();
		formData.append('key', this.decryptFileEntity.key);
		const files = this.dec.file.nativeElement.files;
		for (let i = 0; i < files.length; i++) {
			formData.append('data', files[i]);
		}
		this.encryptFileService.decrypt(formData).subscribe(x => {
			if (window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveBlob(x, this.file2.name);
			} else {
				const elem = window.document.createElement('a');
				elem.href = window.URL.createObjectURL(x);
				elem.download = this.file2.name;
				document.body.appendChild(elem);
				elem.click();
				document.body.removeChild(elem);
			}
		}, error1 => {
			this.toastr.ShowError(error1);
		});
	}

	copyToClipBoard() {
		const el = document.createElement('textarea');
		el.value = this.encryptFileEntity.key;
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		this.toastr.ShowSuccess('Đã copy khóa vào clipboard');
	}

	downloadEncryptedFile() {
		if (window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveBlob(this.data, this.file.name);
		} else {
			const elem = window.document.createElement('a');
			elem.href = window.URL.createObjectURL(this.data);
			elem.download = this.file.name;
			document.body.appendChild(elem);
			elem.click();
			document.body.removeChild(elem);
		}
	}

	checkStyle() {
		return this.type != '';
	}

}
