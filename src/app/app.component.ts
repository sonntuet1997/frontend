import {Component, OnInit} from '@angular/core';
import {ChatService, WebsocketService} from './shared/websocket.service';
import {DropdownComponent} from './shared/material-component/dropdown/dropdown.component';
import {ZipService} from './shared/zip/zip.service';
import {WalletService} from './shared/wallet/wallet.service';
import {BottomToastsManager} from './shared/CustomToaster';
import {ManagementService} from "./shared/management-component/management.service";

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
	currentPing: any = null;

	constructor(public chatService: ChatService, public toastr: BottomToastsManager, public ZipService: ZipService) {
		WalletService.Role.subscribe(t => {
			this.role = t;
		});
		ManagementService.currentPing.subscribe(x => {
			this.currentPing = x;
			this.currentPing.participant = encodeURI(this.currentPing.participant);
		});
		chatService.messages.subscribe(msg => {
			const data = JSON.parse(msg.data);
			if (this.currentPing == null) {
				// this.toastr.ShowError()
			} else {
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
					case 'transaction.file.CreateFileEncryptedEvent': {
						if (data.relative.findIndex(v => v == 'resource:' + this.currentPing.participant) > -1) {
							this.toastr.ShowInfo('File ' + decodeURIComponent(decodeURIComponent(data.file)).substr('resource:file.FileEncrypted#'.length) + ' vừa được tạo');
						}
						break;
					}
					case 'transaction.file.UpdateFileEncryptedEvent': {
						if (data.relative.findIndex(v => v == 'resource:' + this.currentPing.participant) > -1) {
							this.toastr.ShowInfo('File ' + decodeURIComponent(decodeURIComponent(data.file)).substr('resource:file.FileEncrypted#'.length) + ' có đề xuất sửa mới');
						}
						break;
					}
					case 'transaction.file.DeleteFileEncryptedEvent': {
						if (data.relative.findIndex(v => v == 'resource:' + this.currentPing.participant) > -1) {
							this.toastr.ShowInfo('Đề xuất xoá file mới: ' + decodeURIComponent(decodeURIComponent(data.file)).substr('resource:file.FileEncrypted#'.length));
						}
						break;
					}
					case 'transaction.file.ProposeReadFileEncryptedEvent': {
						if (data.relative.findIndex(v => v == 'resource:' + this.currentPing.participant) > -1) {
							this.toastr.ShowInfo('Yêu cầu xem file mới: ' + decodeURIComponent(decodeURIComponent(data.file)).substr('resource:file.FileEncrypted#'.length) + ' (' + data.issuer.substr('resource:manager.User#'.length) + ')');
						}
						break;
					}
					case 'transaction.file.AcceptReadFileEncryptedEvent': {
						if (data.requester == 'resource:' + this.currentPing.participant && data.endorser != 'resource:' + this.currentPing.participant) {
							this.toastr.ShowInfo('Yêu cầu xem file ' +decodeURIComponent(decodeURIComponent(data.file)).substr('resource:file.FileEncrypted#'.length) + ' của bạn vừa được ' + data.endorser.substr('resource:manager.User#'.length) + ' đồng ý');
						}
						break;
					}
					case 'transaction.file.RejectReadFileEncryptedEvent': {
						if (data.requester == 'resource:' + this.currentPing.participant && data.endorser != 'resource:' + this.currentPing.participant) {
							this.toastr.ShowInfo('Yêu cầu xem file ' + decodeURIComponent(decodeURIComponent(data.file)).substr('resource:file.FileEncrypted#'.length) + ' của bạn vừa bị ' + data.endorser.substr('resource:manager.User#'.length) + ' từ chối');
						}
						break;
					}
					default: {
						console.log(msg);
						this.toastr.ShowInfo(msg.data);
					}
				}
			}
		});
	}

	ngOnInit(): void {
		const loadingElement = document.getElementById('Loading');
		loadingElement.classList.add('hide-loading');
		setTimeout(x => {
			loadingElement.parentNode.removeChild(loadingElement);
		}, 1400);
	}
}
