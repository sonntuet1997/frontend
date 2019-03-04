import {Component, Input} from '@angular/core';
import {Http} from '@angular/http';
import {PanelEntity} from './PanelEntity.Component';
// import {AuthService} from "../../Modules/Auth/Auth.Service";
// import {UserEntity} from "../../Modules/User/User.Entity";
// import {UserService} from "../../Modules/User/User.Service";

// import {LayerAccessControlEntity} from "../../Modules/LayerAccessControl/LayerAccessControl.Entity";

@Component({
	selector: 'panel',
	templateUrl: './Panel.Component.html',
	styleUrls: ['./Panel.Component.css']
})
export class PanelComponent {
	@Input() panel: PanelEntity = new PanelEntity();
	public isPanel1Collapse: boolean = false;
	hiddenDivId: string = this.MakeRandomId();
	panelDivId: string = this.MakeRandomId();

	constructor(public Http: Http,
							// private UserService: UserService
							// , public AuthService: AuthService
	) {

	}

	collapse() {
		if (!this.panel.isAccessed) return;
		if (!document.getElementById(this.panelDivId).classList.contains('collapsing')) {
			this.isPanel1Collapse = !this.isPanel1Collapse;
			document.getElementById(this.hiddenDivId).click();
		}
	}


	MakeRandomId(): string {
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	}
}
