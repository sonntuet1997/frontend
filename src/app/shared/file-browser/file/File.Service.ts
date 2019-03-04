import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileEntity} from './File.Entity';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../../HttpService';

@Injectable()
export class FileService extends HttpService<FileEntity> {
	constructor(Http: HttpClient) {
		super(Http, '/api/Files');
	}

	UploadFile(body, IsShowLoading?: boolean): Observable<boolean> {
		return super.intercept(this.http.post<boolean>(this.url + '/Upload', JSON.stringify(body), {
			observe: 'response',
			headers: HttpService.GetHeaders()
		}), IsShowLoading).map(r => r.body);
	}

	DeleteFile(body, IsShowLoading?: boolean): Observable<boolean> {
		return super.intercept(this.http.post<boolean>(this.url + '/Delete', JSON.stringify(body), {
			observe: 'response',
			headers: HttpService.GetHeaders()
		}), IsShowLoading).map(r => r.body);
	}
}
