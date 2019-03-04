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
import {Wallet} from './wallet.model';
import {HttpResponse} from '@angular/common/http';

// Can be injected into a constructor
@Injectable()
export class WalletService {

	public static Role = new EventEmitter<any>();
	public static IsLogin = new EventEmitter<any>();
	private NAMESPACE = 'wallet';

	constructor(private dataService: DataService<Wallet>) {
	};

	public getAll(): Observable<Wallet[]> {
		return this.dataService.getAll(this.NAMESPACE);
	}

	public setDefault(name: string): Observable<HttpResponse<any>> {
		return this.dataService.intercept(this.dataService.http.post<any>('/api/wallet/' + name + '/setDefault', null, {
			observe: 'response',
			headers: DataService.GetHeaders()
		}), true).pipe(map(r => r.body));
	}

	public deleteCard(name: string): Observable<HttpResponse<any>> {
		return this.dataService.intercept(this.dataService.http.delete('/api/wallet/' + name, {
			observe: 'response',
			headers: DataService.GetHeaders()
		}), true).pipe(map(r => r.body));
	}

	public importCard(name: string, form): Observable<HttpResponse<any>> {
		return this.dataService.intercept(this.dataService.http.post<any>('/api/wallet/import?name=' + name, form, {
			observe: 'response',
		}), true).pipe(map(r => r.body));
	}

	public exportCard(name: string) {
		return this.dataService.http.get('/api/wallet/' + name + '/export', {responseType: 'blob'});
	}
}

