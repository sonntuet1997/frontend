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

import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from '../../data.service';
import {Observable} from 'rxjs/internal/Observable';
import 'rxjs/Rx';
import {map} from 'rxjs/operators';
import {Wallet} from '../wallet/wallet.model';
import {WalletService} from '../wallet/wallet.service';
import {ZipService} from '../zip/zip.service';

// Can be injected into a constructor
@Injectable()
export class ManagementService {

	static privateKey;
	static publicKey;
	private NAMESPACE = 'system';
  static currentPing = new EventEmitter();
	constructor(private dataService: DataService<Wallet>, public WalletService: WalletService,
							public ZipService: ZipService) {
	};

	public ping(): Observable<any> {
		return this.dataService.intercept(this.dataService.http.get('/api/system/ping', {
			observe: 'response',
		}), true).pipe(map(r => r.body));
	}

	reset() {
		this.WalletService.getAll().subscribe(x => {
			const k = x.find(v => v.default);
			this.WalletService.exportCard(k.name).subscribe(j => {
				this.ZipService.getEntries(j).subscribe(l => {
					const privateFile = l.find(u => u.filename == 'credentials/privateKey');
					if (privateFile != null) {
						this.ZipService.getData(privateFile).data.subscribe(key => {
							const reader = new FileReader();
							reader.onload = (res: any) => {
								ManagementService.privateKey = res.currentTarget.result;
							};
							reader.readAsText(key);
						})
					}
					const publicFile = l.find(u => u.filename == 'credentials/certificate');
					if (publicFile != null) {
						this.ZipService.getData(publicFile).data.subscribe(key => {
							const reader = new FileReader();
							reader.onload = (res: any) => {
								ManagementService.publicKey = res.currentTarget.result;
							};
							reader.readAsText(key);
						})
					}
				});
			})
		})
	}
}

