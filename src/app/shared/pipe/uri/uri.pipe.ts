import {Pipe, PipeTransform} from '@angular/core';
import {SexList} from "../../../GlobalData";

@Pipe({name: 'uri'})
export class UriPipe implements PipeTransform {

	constructor() {
	}

	transform(value: string): string {
		return decodeURIComponent(value);
	}
}
