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

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import 'rxjs/Rx';
import {DataService} from '../../../data.service';
import {HistorianRecord, Identity} from '../../../org.hyperledger.composer.system';
import {HttpHeaders} from '@angular/common/http';
import {HttpResponse} from '@angular/common/http/src/response';

// Can be injected into a constructor
@Injectable()
export class IdentityService {

	private NAMESPACE = 'system/identities';

	constructor(private dataService: DataService<Identity>) {
	};

	public getAll(): Observable<Identity[]> {
		return this.dataService.getAll(this.NAMESPACE);
	}

	//
	// public getTransaction(id: any): Observable<HistorianRecord> {
	// 	return this.dataService.getSingle(this.NAMESPACE, id);
	// }

	public issue(data): Observable<HttpResponse<Blob>> {
		return this.dataService.intercept(this.dataService.http.post('/api/system/identities/issue', data, {
			observe: 'response',
			responseType: 'blob',
			headers: new HttpHeaders({'content-type': 'application/json; charset=utf-8', 'Accept': 'application/octet-stream'})
		}), true);
	}

	public revoke(id: string): Observable<HttpResponse<any>> {
		return this.dataService.intercept(this.dataService.http.post('/api/system/identities/' + id + '/revoke', null, {
			observe: 'response',
			headers: DataService.GetHeaders()
		}), true);
	}
}
