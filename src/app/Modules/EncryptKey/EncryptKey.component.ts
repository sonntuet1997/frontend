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
import {EncryptKeyService} from './EncryptKey.service';
import 'rxjs/add/operator/toPromise';
import {BottomToastsManager} from '../../shared/CustomToaster';
import {EncryptKeyEntity} from './EncryptKey.entity';

@Component({
	selector: 'app-encryptkey',
	templateUrl: './EncryptKey.component.html',
	styleUrls: ['./EncryptKey.component.css'],
	providers: [EncryptKeyService]
})
export class EncryptKeyComponent {
	public title = 'Mã hóa';
	public encryptFileEntity: EncryptKeyEntity = new EncryptKeyEntity();
	public encryptResult: EncryptKeyEntity;
	public decryptResult: EncryptKeyEntity;
	public decryptFileEntity: EncryptKeyEntity = new EncryptKeyEntity();

	constructor(public encryptKeyService: EncryptKeyService, public toastr: BottomToastsManager) {
	};

	encrypt() {
		this.encryptKeyService.encrypt(this.encryptFileEntity).subscribe(x => {
			this.encryptResult = x;
		});
	}

	copyToClipBoard(value, isString?: boolean) {
		const el = document.createElement('textarea');
		el.value = isString ? value : JSON.stringify(value);
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		this.toastr.ShowSuccess('Đã copy khóa vào clipboard');
	}

	decrypt() {
		this.encryptKeyService.decrypt(this.decryptFileEntity).subscribe(x => {
			this.decryptResult = x;
		});
	}
}
