import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {noop} from 'rxjs/util/noop';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => CheckboxComponent),
	multi: true
};

@Component({
	selector: 'app-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.css'],
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class CheckboxComponent implements ControlValueAccessor, OnInit {
	@Input() disabled: boolean = false;
	private onTouchedCallback: () => void = noop;
	private onChangeCallback: (_: any) => void = noop;
	private internValue = false;

	constructor() {

	}

	get value() {
		return this.internValue;
	}

	set value(obj) {
		this.internValue = obj;
		this.onChangeCallback(obj);
	}

	writeValue(obj: any): void {
		if (obj != null) {
			this.internValue = obj;
		} else {
			this.internValue = false;
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

	toggle() {
		if (!this.disabled) {
			this.value = !this.value;
		}
	}

}
