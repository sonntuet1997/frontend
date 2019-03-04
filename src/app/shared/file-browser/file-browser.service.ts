import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileBrowserEntity} from './file-browser.entity';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FileBrowserService {
	private _parser = new DOMParser();

	constructor(private httpClient: HttpClient) {
	}

	getFiles(url: string): Observable<FileBrowserEntity[]> {
		return this.httpClient.get(url, {responseType: 'text'}).map(x => {
			let el = this._parser.parseFromString(x, 'text/xml');
			let fileArray = el.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
			let result: FileBrowserEntity[] = [];
			for (let i = 0; i < fileArray.length; i++) {
				let type = fileArray[i].classList[0];
				let fileBrowserEntity: FileBrowserEntity = new FileBrowserEntity();
				fileBrowserEntity.IsDirectory = type == 'directory';
				fileBrowserEntity.Name = fileArray[i].getElementsByTagName('a')[0].textContent;
				let tempHref = fileArray[i].getElementsByTagName('a')[0].getAttribute('href');
				if (url[url.length - 1] == '/') url = url.substring(0, url.length - 1);
				fileBrowserEntity.Src = url + tempHref.substring(1, tempHref.length);
				if (!fileBrowserEntity.IsDirectory) {
					let nameSplit = fileBrowserEntity.Name.split('.');
					fileBrowserEntity.Extension = nameSplit.length > 1 ? nameSplit[nameSplit.length - 1] : '';
					fileBrowserEntity.Size = Number.parseInt(fileArray[i].getElementsByClassName('length')[0].textContent.replace(',', ''));
				} else {
					fileBrowserEntity.Extension = '';
					if (fileBrowserEntity.Name[fileBrowserEntity.Name.length - 1] == '/') fileBrowserEntity.Name = fileBrowserEntity.Name.substring(0, fileBrowserEntity.Name.length - 1);
				}
				fileBrowserEntity.LastModified = fileArray[i].getElementsByClassName('modified')[0].textContent;
				result.push(fileBrowserEntity);
			}
			return result;
		});
	}
}
