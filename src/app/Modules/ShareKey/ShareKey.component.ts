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
import {ShareKeyService} from './ShareKey.service';
import 'rxjs/add/operator/toPromise';
import {BottomToastsManager} from '../../shared/CustomToaster';
import {RequestShareKeyEntity} from './RequestShareKey.entity';
import {ShareKeyEntity} from './ShareKey.entity';

@Component({
	selector: 'app-sharekey',
	templateUrl: './ShareKey.component.html',
	styleUrls: ['./ShareKey.component.css'],
	providers: [ShareKeyService]
})
export class ShareKeyComponent {
	public title = 'Mã hóa';
	public requestShareKeyEntity: RequestShareKeyEntity = new RequestShareKeyEntity();
	public result1: ShareKeyEntity[] = [];
	public result2: ShareKeyEntity[] = [];
	public decryptInput: string;
	public decryptResult: string;

	constructor(public shareKeyService: ShareKeyService, public toastr: BottomToastsManager) {
	};

	addNewLine() {
		this.result2.push(new ShareKeyEntity());
		return false;
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

	encrypt() {
		this.shareKeyService.encrypt(this.requestShareKeyEntity).subscribe(x => {
			this.result1 = x;
		})
	}

	decrypt() {
		this.shareKeyService.decrypt(this.result2).subscribe(x => {
			this.decryptResult = x;
		}, error1 => {
			this.decryptResult = error1.error.text;
		})
	}

	updateDecryptTable(event) {
		try {
			this.result2 = JSON.parse(this.decryptInput);
		} catch (e) {
			console.log(e);
		}
	}
}
