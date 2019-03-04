import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'app-menu-purchase',
	templateUrl: './menupurchase.component.html',
	styleUrls: ['./menupurchase.component.css']
})

export class MenuPurchaseComponent implements OnChanges {
	@Input() NumberSelected: number;
	@Input() activeNumber: number;
	@Input() Navigate = true;
	@Output() change: EventEmitter<any> = new EventEmitter();

	MenuList: any[] = [
		{Number: 1, Name: 'Mã hóa file', SubName: '', Active: false},
		{Number: 2, Name: 'Chia sẻ khóa', SubName: '', Active: false},
		{Number: 3, Name: 'Kiểm tra', SubName: '', Active: false},
		{Number: 4, Name: 'Hoàn tất', SubName: '', Active: false}
	];

	constructor(private Router: Router) {
	}

	NavigateLink(Menu) {
		if (Menu.Number > this.activeNumber) {
			return;
		}
		this.change.next(Menu.Number);
		if (this.Navigate) {
			this.Router.navigate([Menu.Link]);
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (!this.activeNumber) {
			throw new Error('Number value is required!')
		} else {
			for (const i of this.MenuList) {
				i.Active = i.Number == this.NumberSelected;
				if (i.Number < this.activeNumber) {
					i.SubName = 'Đã hoàn tất';
				} else if (i.Number === this.activeNumber) {
					i.SubName = 'Đang thực hiện';
				} else {
					i.SubName = '';
				}
			}
		}
	}
}
