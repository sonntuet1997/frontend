import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DropdownComponent} from '../dropdown/dropdown.component';

@Component({
	selector: 'app-tag-input',
	templateUrl: './tagsinput.component.html',
	styleUrls: ['./tagsinput.component.css']
})

export class TagsinputComponent extends DropdownComponent {
	static IsBlock = false;
	IsShow = false;
	@Input() DefaultTagClass = 'badge-info';
	@Input() DisplayProperty = 'name';
	@Input() RemoveTagClass = '';
	@Input() TagLength = 15;
	@Input() isTurnOffAnother = true;
	Id: string = this.MakeRandomId();
	@Input() DataList: Array<any> = [];
	@Output() onEnter: EventEmitter<any> = new EventEmitter();
	@Output() ChangeTag: EventEmitter<any> = new EventEmitter();
	@Input() ChangeWhenUpDown = false;
	@Input() IsLoopOption = false;
	CurrentNumber = -1;
	@Input() IsValidateDataList = true;
	@Input() isMultiSelect = true;
	@Input() Disabled = false;

	// @Input() TagList: Array<any> = [];

	constructor() {
		super();
	}

	RemoveTag(Tag: any) {
		// let indexOf = this.DataList.indexOf(Tag);
		// this.DataList.splice(indexOf, 1);
		// this.ChangeTag.emit(Tag);
		Tag.IsSelected = false;
	}

	MakeRandomId(): string {
		let text = '';
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < 5; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}


}
