import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as XLSX from 'xlsx';
import {ExcelEntity} from './Excel.Entity';

type AOA = Array<Array<any>>;

@Component({
	selector: 'Excel',
	templateUrl: './Excel.component.html'
})

export class ExcelComponent implements OnInit {
	Id: string = this.MakeRandomId();
	@Input() ExcelEntity: ExcelEntity = new ExcelEntity();
	@Output() onFileChanged: EventEmitter<ExcelEntity> = new EventEmitter();
	data: AOA = [[1, 2], [3, 4]];

	constructor() {
	}

	@Input('FileId')
	set Innit(value: string) {
		if (value !== undefined)
			this.Id = value;
		else console.warn('FileId Field isn\'t setted !')
	}

	ngOnInit() {
	}

	OpenFile() {
		document.getElementById(this.Id).click();
	}

	LoadFile(evt) {
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length != 1) {
			throw new Error('Cannot upload multiple files on the entry')
		}
		const reader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, {type: 'binary'});

			/* grab first sheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* save data */
			let data: AOA = XLSX.utils.sheet_to_json(ws, {header: 1});
			if (data == null) {
				console.warn('Cannot read file or file is empty!');
				return;
			}
			this.ExcelEntity.ParseExcel(data);
			this.ExcelEntity.Name = target.files[0].name;
			this.ExcelEntity.Length = target.files[0].size;
			let Arr = this.ExcelEntity.Name.split('.');
			this.ExcelEntity.Extension = Arr.length > 1 ? Arr[Arr.length - 1] : Arr[0];
			evt.target.parentNode.reset();
			this.onFileChanged.emit(this.ExcelEntity);
		};
		reader.readAsBinaryString(target.files[0]);
	}

	MakeRandomId(): string {
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	}
}

