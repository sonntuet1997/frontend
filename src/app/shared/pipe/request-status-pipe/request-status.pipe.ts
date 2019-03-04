import {Pipe, PipeTransform} from '@angular/core';
import {RequestStatusList} from "../../../GlobalData";

@Pipe({name: 'requeststatus'})
export class RequestStatusPipe implements PipeTransform {

	constructor() {
	}

	transform(value: string): string {
		return RequestStatusList.find(x => x.value == value).name;
	}
}
