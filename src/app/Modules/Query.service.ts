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
import {DataService} from '../data.service';
import {map} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';

// Can be injected into a constructor
@Injectable()
export class QueryService {

	private NAMESPACE = 'queries';

	constructor(private dataService: DataService<any>) {
	};

	public selectUserByName(name, isShowLoading?): Observable<any[]> {
		return this.dataService.getAll(this.NAMESPACE + '/selectUserByName?name=' + name, isShowLoading);
	}

	public selectIdentitesByParticipant(array, isShowLoading?): Observable<any[]> {
		debugger;
		const ns = this.NAMESPACE + '/selectIdentitesByParticipant';
		let params = new HttpParams();
		params = params.set('array', JSON.stringify(array));
		return this.dataService.intercept(this.dataService.http.get<any[]>(`${this.dataService.actionUrl}${ns}`, {
			headers: DataService.GetHeaders(),
			observe: 'response',
			params: params
		}), isShowLoading).pipe(map(r => r.body));
	}
}
