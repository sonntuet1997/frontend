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
import {CryptoService} from './Crypto.service';
import 'rxjs/add/operator/toPromise';
import {BottomToastsManager} from '../../shared/CustomToaster';
import {DataEntity} from '../../shared/material-component/inputfile/Data.Entity';

@Component({
	selector: 'app-crypto',
	templateUrl: './Crypto.component.html',
	styleUrls: ['./Crypto.component.css'],
	providers: [CryptoService]
})
export class CryptoComponent {
	public title = 'Mã hóa';
	public file: DataEntity = new DataEntity();
	public file2: DataEntity = new DataEntity();

	constructor(private cryptoService: CryptoService, public toastr: BottomToastsManager) {
	};


	encrypt() {
	}
}
