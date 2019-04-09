import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class BottomToastsManager {
	constructor(private toastrService: ToastrService) {
		this.toastrService.toastrConfig.positionClass = 'toast-bottom-right';
		this.toastrService.toastrConfig.timeOut = 3000;
		this.toastrService.toastrConfig.autoDismiss = true;
	}

	ShowSuccess(message?: any) {
		if (message != null && typeof message !== 'string') {
			this.toastrService.success('', 'Thành công');
		} else {
			this.toastrService.success(message, 'Thành công');
		}
	}

	ShowWarning(message: any) {
		this.toastrService.warning(message, 'Cảnh báo');
	}

	ShowError(message: any) {
		if (typeof message != 'string') {
			this.toastrService.error(message.error, 'Lỗi');
		} else {
			this.toastrService.error(message, 'Lỗi');
		}
	}

	ShowInfo(message: any) {
		this.toastrService.info(message, 'Thông báo');
	}
}
