import {Component, OnInit} from '@angular/core';
import {ChatService, WebsocketService} from './shared/websocket.service';
import {ToastrService} from 'ngx-toastr';
import {DropdownComponent} from './shared/material-component/dropdown/dropdown.component';
import {ZipService} from './shared/zip/zip.service';
import {WalletService} from './shared/wallet/wallet.service';
import {BottomToastsManager} from './shared/CustomToaster';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [WebsocketService, ChatService, ZipService]
})
export class AppComponent implements OnInit {
	title = 'app';
	DropdownComponent: DropdownComponent = new DropdownComponent();
	role: any;

	constructor(public chatService: ChatService, public toastr: BottomToastsManager, public ZipService: ZipService) {
		WalletService.Role.subscribe(t => {
			this.role = t;
		});
		chatService.messages.subscribe(msg => {
			const data = JSON.parse(msg.data);
			switch (data['$class']) {
				case 'transaction.manager.CreateUserEvent': {
					if (this.role.value == 'Manager') {
						this.toastr.ShowInfo(decodeURIComponent(data.user.substr('resource:manager.User#'.length)) + ' vừa được tạo');
					}
					break;
				}
				case 'transaction.manager.UpdateUserEvent': {
					if (this.role.value == 'Manager') {
						this.toastr.ShowInfo(decodeURIComponent(data.user.substr('resource:manager.User#'.length)) + ' vừa được sửa thông tin');
					}
					break;
				}
				default: {
					console.log(msg);
					this.toastr.ShowInfo(JSON.stringify(msg.data));
				}
			}
		});
	}

	// sendMsg() {
	// 	console.log('new message from client to websocket: ', this.message);
	// 	this.chatService.messages.next(this.message);
	// 	this.message.message = '';
	// }

	ngOnInit(): void {
		const loadingElement = document.getElementById('Loading');
		loadingElement.classList.add('hide-loading');
		setTimeout(x => {
			loadingElement.parentNode.removeChild(loadingElement);
		}, 1400);
	}
}
