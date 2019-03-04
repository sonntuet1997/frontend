import {Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {noop} from 'rxjs/util/noop';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => AvatarComponent),
	multi: true
};

@Component({
	selector: 'avatar',
	templateUrl: './avatar.component.html',
	styleUrls: ['./avatar.component.css'],
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class AvatarComponent implements ControlValueAccessor, OnInit {
	public modal: string;
	public imgContent: string = '/assets/img_avatar.png';
	@ViewChild('title') titleRef: ElementRef;
	@Input() title: string;
	@Input() width: string;
	@Input() height: string;
	isEnableScroll: boolean = true;
	isShowTitle: boolean = false;
	private onTouchedCallback: () => void = noop;
	private onChangeCallback: (_: any) => void = noop;

	constructor() {

	}

	get value() {
		return this.imgContent;
	}

	set value(obj) {
		this.imgContent = obj;
		this.onChangeCallback(obj);
	}

	writeValue(obj: any): void {
		if (obj != null) {
			this.imgContent = obj;
		} else {
			this.imgContent = '/assets/img_avatar.png';
		}
	}

	registerOnChange(fn: any): void {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouchedCallback = fn;
	}

	ngOnInit(): void {
	}

	toggleScrollBody() {
		if (this.imgContent == null) return;
		if (this.isEnableScroll) {
			document.body.style.overflowY = 'hidden';
		} else {
			document.body.style.overflowY = 'inherit';
		}
		this.isEnableScroll = !this.isEnableScroll;
	}

	showTitle() {
		this.isShowTitle = true;
	}

	offTitle() {
		this.isShowTitle = false;
	}
}
