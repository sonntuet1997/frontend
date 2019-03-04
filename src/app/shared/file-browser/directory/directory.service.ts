import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DirectoryEntity} from './directory.entity';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../../HttpService';

@Injectable()
export class DirectoryService extends HttpService<DirectoryEntity> {
	constructor(Http: HttpClient) {
		super(Http, '/api/Directories');
	}

	CreateFolder(body, IsShowLoading?: boolean): Observable<DirectoryEntity> {
		return super.intercept(this.http.post<DirectoryEntity>(this.url + '/Create', JSON.stringify(body), {
			observe: 'response',
			headers: HttpService.GetHeaders()
		}), IsShowLoading).map(r => r.body);
	}

	RenameFolder(body, IsShowLoading?: boolean): Observable<DirectoryEntity> {
		return super.intercept(this.http.post<DirectoryEntity>(this.url + '/Rename', JSON.stringify(body), {
			observe: 'response',
			headers: HttpService.GetHeaders()
		}), IsShowLoading).map(r => r.body);
	}

	DeleteFolder(body, IsShowLoading?: boolean): Observable<DirectoryEntity> {
		return super.intercept(this.http.post<DirectoryEntity>(this.url + '/Delete', JSON.stringify(body), {
			observe: 'response',
			headers: HttpService.GetHeaders()
		}), IsShowLoading).map(r => r.body);
	}
}
