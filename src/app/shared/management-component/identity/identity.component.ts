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
import {IdentityService} from './identity.service';
import 'rxjs/add/operator/toPromise';
import {BottomToastsManager} from '../../CustomToaster';
import {Identity, IdentityState} from '../../../org.hyperledger.composer.system';
import {IComponent} from '../../CodeInterface/IComponent.Component';
import {ParticipantClassNameList} from '../../../GlobalData';

@Component({
	selector: 'app-identity',
	templateUrl: './identity.component.html',
	styleUrls: ['./identity.component.css'],
	providers: [IdentityService]
})
export class IdentityComponent extends IComponent<Identity> {
	public title = 'định danh';
	public identity: any = {options: {issuer: false}};
	public ParticipantClassNameList;
	public participantClass;
	public participantID;

	constructor(public identityService: IdentityService, toastr: BottomToastsManager) {
		super(toastr);
		this.getService = identityService;
		this.search();
		this.ParticipantClassNameList = ParticipantClassNameList;
	};

	issue() {
		this.identity.participant = this.participantClass + '#' + this.participantID;
		this.identityService.issue(this.identity).subscribe(x => {
			const b = new Blob([x.body], {type: 'application/*'});
			const url = window.URL.createObjectURL(b);
			const link = document.createElement('a');
			if (typeof link.download === 'string') {
				document.body.appendChild(link); // Firefox requires the link to be in the body
				link.download = this.identity.userID + '.card';
				link.href = url;
				link.click();
				document.body.removeChild(link); // remove the link when done
			} else {
				location.replace(url);
			}
			this.search();
		}, error => {
			const reader = new FileReader();
			reader.addEventListener('loadend', (e: any) => {
				const text = e.srcElement.result;
				const er = JSON.parse(text).error;
				if (er.message.indexOf('"code":0')>-1) {
					this.toastr.ShowError('Tên định danh bị trùng!');
				} else if (er.message.indexOf("does not exist")>-1){
					this.toastr.ShowError('Người dùng không tồn tại');
				} else {
					const erArr = er.message.split(er.name);
					this.toastr.ShowError(erArr[erArr.length - 1]);
				}
			});
			reader.readAsText(error.error);
		});
	}

	revoke(identityId) {
		this.identityService.revoke(identityId).subscribe(x => {
			// this.toastr.ShowSuccess();
			this.search();
		}, error => {
			const er = error.error.error;
			const erArr = er.message.split(er.name);
			this.toastr.ShowError(erArr[erArr.length - 1]);
		})
	}

	isRevoked(entity): boolean {
		return entity.state == IdentityState.REVOKED;
	};
}
