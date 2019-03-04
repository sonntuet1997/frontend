import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'EmployeeCode'})
export class EmployeeCodePipe implements PipeTransform {
	constructor() {
	}

	transform(value: number, fractionSize: number = 2): string {
		let t = value.toString();
		let result = '';
		for (let i = 0; i < 6 - t.length; i++) {
			result += '0';
		}
		result += t;
		return result;
	}

	parse(value: number, fractionSize: number = 2): string {
		let t = value.toString();
		let result = '';
		for (let i = 0; i < 6 - t.length; i++) {
			result += '0';
		}
		result += t;
		return result;
	}

}
