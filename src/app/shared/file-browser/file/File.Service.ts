import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileEntity} from './File.Entity';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../../HttpService';
import {DataService} from '../../../data.service';
import {EncryptFileEntity} from '../../../Modules/EncryptFile/EncryptFile.entity';

@Injectable()
export class FileService{

	private NAMESPACE = 'files';

	constructor(public dataService: DataService<EncryptFileEntity>) {
	};


	public upload(body): Observable<any> {
		return this.dataService.sendFile('/tool-api/' + this.NAMESPACE + '/upload', body);
	}

	public download(body): Observable<any> {
		this.dataService.turnOnModal();
		return this.dataService.sendFile('/tool-api/' + this.NAMESPACE + '/download', body);
	}
}
