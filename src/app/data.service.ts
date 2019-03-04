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
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {finalize, map, tap} from 'rxjs/operators';

@Injectable()
export class DataService<Type> {
	public PendingRequests = 0;
	public ShowLoading = false;
	public readonly actionUrl = '/api/';
	private resolveSuffix = '?resolve=true';

	constructor(public http: HttpClient) {
	}

	static GetHeaders(): HttpHeaders {
		return new HttpHeaders({'content-type': 'application/json; charset=utf-8', 'Accept': 'application/json'});
	}

	public post(ns: string, body: any, IsShowLoading?: boolean): Observable<Type> {
		return this.intercept(this.http.post<any>(ns, body, {
			observe: 'response',
			headers: DataService.GetHeaders()
		}), IsShowLoading).pipe(map(r => r.body));
	}

	public sendFile(ns: string, body: any, IsShowLoading?: boolean): Observable<Type> {
		return this.intercept(this.http.post(ns, body, {
			observe: 'response',
			responseType: 'blob'
	}), IsShowLoading).pipe(map(r => r.body));
	}

	public getAll(ns: string, IsShowLoading?: boolean): Observable<Type[]> {
		console.log('GetAll ' + ns + ' to ' + this.actionUrl + ns);
		return this.intercept(this.http.get<Type[]>(`${this.actionUrl}${ns}`, {
			observe: 'response',
			headers: DataService.GetHeaders(),
		}), IsShowLoading).pipe(map(r => r.body));
	}

	public get(ns: string, IsShowLoading?: boolean): Observable<any> {
		console.log('GetAll ' + ns + ' to ' + this.actionUrl + ns);
		return this.intercept(this.http.get<Type[]>(`${this.actionUrl}${ns}`, {
			observe: 'response',
		}), IsShowLoading).pipe(map(r => r.body));
	}

	public getSingle(ns: string, id: string, IsShowLoading?: boolean): Observable<Type> {
		console.log('GetSingle ' + ns);
		return this.intercept(this.http.get<Type>(this.actionUrl + ns + '/' + id + this.resolveSuffix, {
			observe: 'response',
			headers: DataService.GetHeaders()
		}), IsShowLoading).pipe(map(r => r.body));
	}

	public add(ns: string, asset: Type, IsShowLoading?: boolean): Observable<Type> {
		console.log('Entered DataService add');
		console.log('Add ' + ns);
		console.log('asset', asset);
		return this.intercept(this.http.post<Type>(this.actionUrl + ns, asset, {
			observe: 'response',
			headers: DataService.GetHeaders()
		}), IsShowLoading).pipe(map(r => r.body));
	}

	public update(ns: string, id: string, itemToUpdate: Type, isShowLoading?: boolean): Observable<Type> {
		console.log('Update ' + ns);
		console.log('what is the id?', id);
		console.log('what is the updated item?', itemToUpdate);
		console.log('what is the updated item?', JSON.stringify(itemToUpdate));
		return this.intercept(this.http.put<Type>(`${this.actionUrl}${ns}/${id}`, itemToUpdate, {
			observe: 'response',
			headers: DataService.GetHeaders()
		}), isShowLoading).pipe(map(r => r.body));
	}

	delete(ns: string, id: string, isShowLoading?: boolean): Observable<Type> {
		console.log('Delete ' + ns);
		return this.intercept(this.http.delete(this.actionUrl + ns + '/' + id, {
			observe: 'response',
			headers: DataService.GetHeaders()
		}), isShowLoading).pipe(map(r => r.body));
	}

	public intercept(observable: Observable<HttpResponse<any>>, isShowLoading?: boolean): Observable<HttpResponse<any>> {
		if (isShowLoading != false) {
			this.turnOnModal();
		}
		return observable
			.pipe(tap((res: HttpResponse<any>) => {
				console.log('Response: ', res);
			}, (err: any) => {
				if (isShowLoading != false) {
					this.turnOffModal();
				}
				console.log('Caught error: ', err);
			})).pipe(
				finalize(() => {
					if (isShowLoading != false) {
						this.turnOffModal();
					}
				}));
	}

	public turnOnModal() {
		this.PendingRequests++;
		if (!this.ShowLoading) {
			this.ShowLoading = true;
			document.getElementById('SpinnerBar').style.display = 'block';
		}
		this.ShowLoading = true;
	}

	public turnOffModal() {
		this.PendingRequests--;
		if (this.PendingRequests <= 0) {
			if (this.ShowLoading) {
				this.PendingRequests = 0;
				document.getElementById('SpinnerBar').style.display = 'none';
			}
			this.ShowLoading = false;
		}
	}
}

