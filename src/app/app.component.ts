import {Component, OnInit} from '@angular/core';
import {ChatService, WebsocketService} from './shared/websocket.service';
import {ToastrService} from 'ngx-toastr';
import {DropdownComponent} from './shared/material-component/dropdown/dropdown.component';
import {ZipService} from './shared/zip/zip.service';
import {WalletService} from './shared/wallet/wallet.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [WebsocketService, ChatService, ZipService, WalletService]
})
export class AppComponent implements OnInit {
	title = 'app';
	DropdownComponent: DropdownComponent = new DropdownComponent();

	constructor(public chatService: ChatService, public ToastrService: ToastrService, public ZipService: ZipService,
							public WalletService: WalletService
	) {
		chatService.messages.subscribe(msg => {
			this.ToastrService.warning(JSON.stringify(msg.data), 'Thông báo');
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
