import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {IEntity} from './CodeInterface/IEntity.Entity';
import {ISearchEntity} from './CodeInterface/ISearchEntity.Entity';

export class HttpService<Entity> {
	public PendingRequests: number = 0;
	public ShowLoading: boolean = false;

	//public url: string = "";
	constructor(public http: HttpClient, public url: string) {
	}

	public static GetHeaders(): HttpHeaders {
		return new HttpHeaders({'content-type': 'application/json; charset=utf-8'});
	}

	Gets(SearchEntity?: ISearchEntity, IsShowLoading?: boolean): Observable<Entity[]> {
		SearchEntity = SearchEntity === undefined ? new ISearchEntity() : SearchEntity;
		return this.intercept(this.http.get<Entity[]>(this.url, {
			observe: 'response',
			headers: HttpService.GetHeaders(),
			params: SearchEntity.ToParams()
		}), IsShowLoading).map(r => r.body);
	}

	Count(SearchEntity?: ISearchEntity, IsShowLoading?: boolean): Observable<number> {
		SearchEntity = SearchEntity === undefined ? new ISearchEntity() : SearchEntity;
		return this.intercept(this.http.get<number>(this.url + '/Count', {
			observe: 'response',
			headers: HttpService.GetHeaders(),
			params: SearchEntity.ToParams()
		}), IsShowLoading).map(r => r.body);
	}

	GetId(Id: number, IsShowLoading?: boolean): Observable<Entity> {
		return this.intercept(this.http.get<Entity>(`${this.url}/${Id}`, {
			observe: 'response',
			headers: HttpService.GetHeaders()
		}), IsShowLoading).map(r => r.body);
	}

	Create(body: IEntity, isShowLoading?: boolean): Observable<Entity> {
		return this.intercept(this.http.post<Entity>(this.url, JSON.stringify(body), {
			observe: 'response',
			headers: HttpService.GetHeaders()
		}), isShowLoading).map(r => r.body);
	}

	Update(body: IEntity, IsShowLoading?: boolean): Observable<Entity> {
		return this.intercept(this.http.put<Entity>(`${this.url}/${body.Id}`, JSON.stringify(body), {
			observe: 'response',
			headers: HttpService.GetHeaders()
		}), IsShowLoading).map(r => r.body);
	}

	Delete(Id: number, IsShowLoading?: boolean): Observable<boolean> {
		return this.intercept(this.http.delete(`${this.url}/${Id}`, {
			observe: 'response',
			headers: HttpService.GetHeaders()
		}), IsShowLoading).map(r => r.body);
	}

	public intercept(observable: Observable<HttpResponse<any>>, isShowLoading?: boolean): Observable<HttpResponse<any>> {
		if (isShowLoading) this.turnOnModal();
		return observable
			.do((res: HttpResponse<any>) => {
				console.log('Response: ', res);
			}, (err: any) => {
				if (isShowLoading) this.turnOffModal();
				console.log('Caught error: ', err);
			})
			.finally(() => {
				if (isShowLoading) this.turnOffModal();
			});
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
