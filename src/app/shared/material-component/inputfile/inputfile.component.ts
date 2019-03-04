import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataEntity} from './Data.Entity';
import * as CryptoJS from 'crypto-js';
import {HashService} from '../../Hash/hash.service';

@Component({
	selector: 'app-inputfile',
	templateUrl: './inputfile.component.html'
})
export class InputfileComponent implements OnInit {
	@Input() DataEntity: DataEntity = new DataEntity();
	@Output() onFileChanged: EventEmitter<DataEntity> = new EventEmitter();
	@ViewChild('file') public file: ElementRef<any>;
	@Input() convertBase64 = true;

	constructor() {
	}

	ngOnInit() {
	}

	OpenFile() {
		this.file.nativeElement.click();
	}

	hash() {
		const file = this.file.nativeElement.files[0];
		const SHA1 = CryptoJS.algo.SHA1.create();
		let counter = 0;
		const result = new EventEmitter();
		const hashService = new HashService();
		hashService.loading(file,
			(data) => {
				const wordBuffer = CryptoJS.lib.WordArray.create(data);
				SHA1.update(wordBuffer);
				counter += data.byteLength;
				console.log(((counter / file.size) * 100).toFixed(0) + '%');
			}, () => {
				console.log('100%');
				const encrypted = SHA1.finalize().toString();
				result.next(encrypted);
				console.log('encrypted: ' + encrypted);
			});
		return result;
	}

	// hash() {
	// 	const file = this.file.nativeElement.files[0];
	// 	let start = 0;
	// 	const reader = new FileReader();
	// 	const result = new EventEmitter();
	// 	let blob = file.slice(start, start + 4194304);
	// 	const hasher = new Hash();
	// 	reader.onloadend = (e: any) => {
	// 		hasher.update(e.target.result);
	// 		start += 4194304;
	// 		blob = file.slice(start, start + 4194304);
	// 		if (blob.size > 0) {
	// 			reader.readAsBinaryString(blob);
	// 		} else {
	// 			result.next(e.target.result);
	// 		}
	// 	};
	// 	if (blob.size > 0) {
	// 		reader.readAsBinaryString(blob);
	// 	}
	// 	return result;
	// }

	LoadFile(files) {
		const f = files[0],
			r = new FileReader();
		if (f == null) {
			this.DataEntity.data = null;
			this.DataEntity.name = null;
			this.DataEntity.extension = null;
			this.DataEntity.length = 0;
			return;
		}
		this.DataEntity.name = f.name;
		this.DataEntity.length = f.size;
		const Arr = this.DataEntity.name.split('.');
		this.DataEntity.extension = Arr.length > 1 ? Arr[Arr.length - 1] : Arr[0];
		this.onFileChanged.emit(this.DataEntity);
		if (this.convertBase64) {
			r.onloadend = (e: any) => { // callback after files finish loading
				this.DataEntity.data = r.result;
				this.DataEntity.data = this.DataEntity.data.substr(this.DataEntity.data.indexOf(',') + 1);
				// this.file.nativeElement.value = '';
			};
			r.readAsDataURL(f);
		}
	}
}

