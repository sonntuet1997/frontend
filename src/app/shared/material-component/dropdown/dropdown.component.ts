import {AfterContentChecked, Component, ElementRef, EventEmitter, forwardRef, Input, Output, SimpleChanges, ViewChild} from '@angular/core';
import {OnChanges, OnInit} from '@angular/core/src/metadata/lifecycle_hooks';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => DropdownComponent),
	multi: true
};

@Component({
	selector: 'app-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.css']
})

export class DropdownComponent implements ControlValueAccessor, OnInit, OnChanges, AfterContentChecked {
	static DropdownComponentList: Array<DropdownComponent> = [];
	static IsBlock = false;
	IsShow = false;
	@Input() isMultiSelect = false;
	@Input() isTurnOffAnother = true;
	Id: string = this.MakeRandomId();
	@Input() DataList: Array<any> = [{}];
	@Output() onEnter: EventEmitter<any> = new EventEmitter();
	@Input() ChangeWhenUpDown = true;
	@Input() IsLoopOption = false;
	CurrentNumber = -1;
	@Input() IsValidateDataList = true;
	@Input() PropertyActive = 'IsActive';
	@Input() PropertySelected = 'IsSelected';
	public IsFirstClick = true;
	@Input() IsTree = false;
	@Input() IsError = false;
	@Output() onFirstClick: EventEmitter<any> = new EventEmitter();
	@Input() IdentifierProperty = 'Id';
	@Input() ClassContent = '';
	@Output() onNgModelChange = new EventEmitter();
	@Input() HideContentWhenError = true;
	@ViewChild('content') ContentElement: ElementRef;
	@ViewChild('input') InputElement: ElementRef;

	constructor() {
		DropdownComponent.DropdownComponentList.push(this);
	}

	writeValue(obj: any): void {
	}

	registerOnChange(fn: any): void {
	}

	registerOnTouched(fn: any): void {
	}

	ngOnInit(): void {
		// this.InputElement.nativeElement.getElementsByTagName('input')[0].onfocus = (events) => {
		// 	if (!this.IsShow) {
		// 		this.Click()
		// 	}
		// };
	}

	ngOnChanges(changes: SimpleChanges): void {

	}

	ngAfterContentChecked() {
		if (this.ContentElement == null) {
			return;
		}
		const options = this.ContentElement.nativeElement.getElementsByTagName('li');
		for (let i = 0; i < options.length; i++) {
			options[i].onclick = (event) => {
				if (!this.IsShow) {
					this.Click();
				}
			};
			options[i].mouseenter = (event) => {
				'  The quick brown fox jumps over the lazy dog. '.match(/\S+/g);
			};
			options[i].mouseleave = (event) => {

			};
		}
	}

	MakeRandomId(): string {
		let text = '';
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < 5; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}

	TurnOn() {
		this.IsShow = true;
		DropdownComponent.IsBlock = true;
		setTimeout(() => {
			DropdownComponent.IsBlock = false;
			this.TurnOffAnother();
		}, 40);
	}

	Click() {
		if (this.IsFirstClick) {
			this.IsFirstClick = false;
			this.onFirstClick.emit();
		}
		if (this.IsShow) {
			this.IsShow = false;
			return;
		}
		this.Remove();
		this.ValidateDataList();
		this.TurnOn();
	}

	Esc() {
		if (this.IsShow) {
			this.IsShow = false;
			return;
		}
		this.Remove();
		this.TurnOn();
	}

	CheckShiftTab(event) {
		if (event.keyCode == 9) {
			this.IsShow = false;
		}
	}

	TurnOff(event?) {
		if (this.isMultiSelect || this.IsTree) {
			this.TurnOn();
			return;
		}
		console.log(event);
		this.IsShow = false;
	}

	TurnOffAnother() {
		if (this.isTurnOffAnother == false || DropdownComponent.IsBlock) {
			return;
		}
		DropdownComponent.DropdownComponentList.forEach(DC => {
			if (DC.Id != this.Id) {
				DC.IsShow = false;
			}
		})
	}

	Up() {
		if (this.DataList == null || this.DataList.length == 0) {
			return false;
		}
		const length = this.DataList.length;
		for (let i = 0; i < length; i++) {
			if (this.DataList[i][this.PropertyActive] == true) {
				this.DataList[i][this.PropertyActive] = false;
				if (i == 0) {
					if (this.IsLoopOption) {
						this.DataList[length - 1][this.PropertyActive] = true;
						const ActiveElements = this.ContentElement.nativeElement.getElementsByClassName('li-active');
						for (let i = 0; i < ActiveElements.length; i++) {
							ActiveElements.item(i).scrollIntoView({behavior: 'instant', inline: 'end'});
						}
					} else {
						this.DataList[0][this.PropertyActive] = true;
						const ActiveElements = this.ContentElement.nativeElement.getElementsByClassName('li-active');
						for (let i = 0; i < ActiveElements.length; i++) {
							ActiveElements.item(i).scrollIntoView({behavior: 'instant', inline: 'end'});
						}
					}
				} else {
					this.DataList[i - 1][this.PropertyActive] = true;
					const ActiveElements = this.ContentElement.nativeElement.getElementsByClassName('li-active');
					for (let i = 0; i < ActiveElements.length; i++) {
						ActiveElements.item(i).scrollIntoView({behavior: 'instant', inline: 'end'});
					}
				}
				if (this.ChangeWhenUpDown == true && this.isMultiSelect == false) {
					this.TurnOn();
				}
				return false;
			}
		}
		this.DataList[0][this.PropertyActive] = true;
		if (this.ChangeWhenUpDown == true && this.isMultiSelect == true) {
			this.Enter();
			this.TurnOn();
		}
		return false;
	}

	Down() {
		if (this.DataList == null || this.DataList.length == 0) {
			return false;
		}
		const length = this.DataList.length;
		for (let i = 0; i < length; i++) {
			if (this.DataList[i][this.PropertyActive] == true) {
				this.DataList[i][this.PropertyActive] = false;
				if (i == length - 1) {
					if (this.IsLoopOption) {
						this.DataList[0][this.PropertyActive] = true;
						const ActiveElements = this.ContentElement.nativeElement.getElementsByClassName('li-active');
						for (let i = 0; i < ActiveElements.length; i++) {
							ActiveElements.item(i).scrollIntoView({behavior: 'instant', inline: 'start'});
						}
					} else {
						this.DataList[length - 1][this.PropertyActive] = true;
						const ActiveElements = this.ContentElement.nativeElement.getElementsByClassName('li-active');
						for (let i = 0; i < ActiveElements.length; i++) {
							ActiveElements.item(i).scrollIntoView({behavior: 'instant', inline: 'start'});
						}
					}
				} else {
					this.DataList[i + 1][this.PropertyActive] = true;
					const ActiveElements = this.ContentElement.nativeElement.getElementsByClassName('li-active');
					for (let i = 0; i < ActiveElements.length; i++) {
						ActiveElements.item(i).scrollIntoView({behavior: 'instant', inline: 'start'});
					}
				}
				if (this.ChangeWhenUpDown == true && this.isMultiSelect == false) {
					this.TurnOn();
				}
				return false;
			}
		}
		this.DataList[0][this.PropertyActive] = true;
		if (this.ChangeWhenUpDown == true && this.isMultiSelect == true) {
			this.Enter();
			this.TurnOn();
		}
		return false;
	}

	Remove() {
		if (this.DataList == null) {
			return;
		}
		const length = this.DataList.length;
		for (let i = 0; i < length; i++) {
			this.DataList[i][this.PropertyActive] = false;
		}
		// if(!this.isMultiSelect) {
		//     for (let i = 0; i < length; i++) {
		//         this.DataList[i].IsSelected = false;
		//     }
		// }
	}

	Enter() {
		if (this.DataList == null) {
			return;
		}
		const length = this.DataList.length;
		for (let i = 0; i < length; i++) {
			if (this.DataList[i][this.PropertyActive] == true) {
				if (!this.isMultiSelect) {
					for (let j = 0; j < length; j++) {
						if (this.DataList[j].IsSelected == true) {
							this.DataList[j].IsSelected = false;
							break;
						}
					}
					this.CurrentNumber = i;
					this.DataList[i].IsSelected = true;
				} else {
					this.CurrentNumber = i;
					this.DataList[i].IsSelected = !this.DataList[i].IsSelected;
				}
				this.TurnOff();
				this.onEnter.emit(this.DataList[i]);
				return;
			}
		}
		// if (this.DataList == null && this.DataList.length <= this.CurrentNumber) return;
		// let length = this.DataList.length;
		// for (let i = 0; i < length; i++) {
		//     if (this.DataList[i][this.PropertyCheck] == true) {
		//         if (!this.isMultiSelect) {
		//             for (let j = 0; j < length; j++) {
		//                 if (this.DataList[j].IsSelected == true) {
		//                     this.DataList[j].IsSelected = false;
		//                     break;
		//                 }
		//             }
		//         }
		//         this.DataList[i].IsSelected = true;
		//         this.TurnOff();
		//         this.onEnter.emit(this.DataList[i]);
		//         return;
		//     }
		// }
	}

	ValidateDataList() {
		if (this.DataList == null || !this.IsValidateDataList || this.isMultiSelect) {
			return;
		}
		const length = this.DataList.length;
		let count = 0;
		for (let j = 0; j < length; j++) {
			if (this.DataList[j].IsSelected == true) {
				count++;
			}
		}
		if (this.CurrentNumber < this.DataList.length && count > 1) {
			if (this.DataList[this.CurrentNumber].IsSelected == undefined) {
				this.DataList[this.CurrentNumber].IsSelected = false;
			} else {
				this.DataList[this.CurrentNumber].IsSelected = false;
			}

		}
		for (let j = 0; j < length; j++) {
			if (this.DataList[j].IsSelected == true) {
				this.CurrentNumber = j;
				return;
			}
		}
	}
}
