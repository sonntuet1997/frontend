import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class BottomToastsManager {
	constructor(private toastrService: ToastrService) {
		this.toastrService.toastrConfig.positionClass = 'toast-bottom-right';
		this.toastrService.toastrConfig.timeOut = 3000;
		this.toastrService.toastrConfig.autoDismiss = true;
	}

	ShowSuccess(message?: any, title?: any) {
		if (message != null && typeof message !== 'string') {
			this.toastrService.success('', title == null ? 'Thành công' : title);
		} else {
			this.toastrService.success(message, title == null ? 'Thành công' : title);
		}
	}

	ShowWarning(message: any, title?: any) {
		this.toastrService.warning(message, title == null ? 'Cảnh báo' : title);
	}

	ShowError(message: any, title?: any) {
		if (typeof message != 'string') {
			this.toastrService.error(message.error, title == null ? 'Lỗi' : title);
		} else {
			this.toastrService.error(message, title == null ? 'Lỗi' : title);
		}
	}

	ShowInfo(message: any, title?: any) {
		this.toastrService.info(message, title == null ? 'Thông báo' : title);
	}
}
