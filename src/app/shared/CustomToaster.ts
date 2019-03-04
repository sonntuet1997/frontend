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
			this.toastrService.success('Thành công!', 'Success');
		} else {
			this.toastrService.success(message, 'Success');
		}
	}

	ShowWarning(message: any) {
		this.toastrService.warning(message, 'Warning');
	}

	ShowError(message: any) {
		if (typeof message != 'string') {
			this.toastrService.error(message.error, 'Error');
		} else {
			this.toastrService.error(message, 'Error');
		}
	}

	ShowInfo(message: any) {
		this.toastrService.info(message, 'Information');
	}
}
