import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';


@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
	ID: string = this.MakeRandomId();
	@ViewChild('OpenModal') OpenModal;
	@ViewChild('BobyModal') BobyModal;
	@Input() WidthModal = 1440;
	@Input() ModalSize = 'xl';
	@Input() ModalType = 'dialog';
	@Output() onClose = new EventEmitter();
	public disClose = false;

	constructor() {
		if (this.ModalSize === undefined) {
			this.ModalSize = 'md';
		}
	}

	open(disClose?) {
		if (getComputedStyle(document.getElementById(this.ID)).display == 'none'
			&& (document.getElementById(this.ID).className.indexOf('collaps') < 0)) {
			this.OpenModal.nativeElement.click();
		}
		this.disClose = disClose == null ? this.disClose : disClose;
	}

	close(disClose?) {
		if (getComputedStyle(document.getElementById(this.ID)).display == 'block'
			&& (document.getElementById(this.ID).className.indexOf('collaps') < 0)) {
			this.OpenModal.nativeElement.click();
			if (disClose != true) {
				this.onClose.next();
			} else {
				this.disClose = true;
			}
		}
	}

	ngOnInit() {
	}

	MakeRandomId(): string {
		let text = '';
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		for (let i = 0; i < 5; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}

	clickOutSide(event) {
		if (getComputedStyle(document.getElementById(this.ID)).display != 'none') {
			setTimeout(x => {
					if (document.getElementById(this.ID) != null &&
						getComputedStyle(document.getElementById(this.ID)).display == 'none' &&
						!this.disClose) {
						this.onClose.next();
					}
				},
				250
			)
		}
	}
}
