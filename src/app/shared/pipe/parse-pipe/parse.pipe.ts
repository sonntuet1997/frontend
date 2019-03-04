import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'parse'})
export class ParsePipe implements PipeTransform {

	constructor() {
	}

	transform(value: string, require): string {
		const temp = value.split('#');
		const id = temp[temp.length - 1];
		return require[0].find(x => x[require[1]] == id)[require[2]];
	}
}
