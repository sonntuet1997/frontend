import {Pipe, PipeTransform} from '@angular/core';
import {IssueStatusList} from "../../../GlobalData";

@Pipe({name: 'issueStatus'})
export class IssueStatusPipe implements PipeTransform {

	constructor() {
	}

	transform(value: string): string {
		return IssueStatusList.find(x => x.value == value).name;
	}
}
