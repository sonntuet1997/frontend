import {Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {noop} from 'rxjs/util/noop';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => ImageComponent),
	multi: true
};

@Component({
	selector: 'image',
	templateUrl: './image.component.html',
	styleUrls: ['./image.component.css'],
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class ImageComponent implements ControlValueAccessor, OnInit {
	public modal: string;
	public imgContent: string;
	@ViewChild('imgRef') img: ElementRef;
	@ViewChild('imgRef2') img2: ElementRef;
	@ViewChild('title') titleRef: ElementRef;
	@Input() title: string;
	@Input() width: string;
	@Input() defaultSrc: string = 'assets/no-image-available.jpg';
	@Input() height: string;
	isEnableScroll: boolean = true;
	isShowTitle: boolean = false;
	private onTouchedCallback: () => void = noop;
	private onChangeCallback: (_: any) => void = noop;

	constructor() {

	}

	writeValue(obj: any): void {
		if (obj != null) {
			this.imgContent = obj;
			this.img.nativeElement.src = this.imgContent;
			this.img2.nativeElement.src = this.imgContent;
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
