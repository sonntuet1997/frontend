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
import {HashService} from './Hash.service';
import 'rxjs/add/operator/toPromise';
import {BottomToastsManager} from '../../shared/CustomToaster';
import {DataEntity} from '../../shared/material-component/inputfile/Data.Entity';
import {InputfileComponent} from '../../shared/material-component/inputfile/inputfile.component';

@Component({
	selector: 'app-hash',
	templateUrl: './Hash.component.html',
	styleUrls: ['./Hash.component.css'],
	providers: [HashService]
})

export class HashComponent {
	public title = 'Băm';
	@Input() public file: DataEntity = new DataEntity();
	public data: Uint8Array;
	@ViewChild('enc') enc: InputfileComponent;
	public hashResult = '';
	public status = false;
	constructor(public encryptFileService: HashService, public toastr: BottomToastsManager) {
	};

	fileChange() {
		this.hashResult = '';
	}

	hash() {
		this.enc.hash().subscribe(v => {
			this.status = false;
			this.hashResult = v;
		}, error1 => {
			this.toastr.ShowError(error1);
			this.status = false;
		});
	}

}
