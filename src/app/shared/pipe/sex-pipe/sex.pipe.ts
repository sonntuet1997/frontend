import {Pipe, PipeTransform} from '@angular/core';
import {SexList} from "../../../GlobalData";

@Pipe({name: 'sex'})
export class SexPipe implements PipeTransform {

	constructor() {
	}

	transform(value: string): string {
		return SexList.find(x => x.value == value).name;
	}
}
