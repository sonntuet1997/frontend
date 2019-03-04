import {Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {noop} from 'rxjs/util/noop';
import {NgbTime} from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';
import {Time} from '@angular/common';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => TimeComponent),
	multi: true
};

@Component({
	selector: 'time',
	templateUrl: './time.component.html',
	styleUrls: ['./time.component.css'],
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TimeComponent implements ControlValueAccessor, OnInit {
	@Input() placeholder: string = '';
	@ViewChild('d3') d3;
	private onTouchedCallback: () => void = noop;
	private onChangeCallback: (_: any) => void = noop;
	private innerValue: any = '';

	constructor(private el: ElementRef) {

	}

	//get accessor
	get value(): any {
		return this.innerValue;
	};

	//set accessor including call the onchange callback
	set value(v: any) {
		if (v !== this.innerValue) {
			this.innerValue = v;
			this.onChangeCallback(this.format(v));
		}
	}

	//Set touched on blur
	onBlur() {
		this.onTouchedCallback();
	}

	//From ControlValueAccessor interface
	writeValue(value: any) {
		if (this.parse(value) !== this.innerValue) {
			this.innerValue = this.parse(value);
		}
	}

	//From ControlValueAccessor interface
	registerOnChange(fn: any) {
		this.onChangeCallback = fn;
	}

	//From ControlValueAccessor interface
	registerOnTouched(fn: any) {
		this.onTouchedCallback = fn;
	}

	ngOnInit() {
		window.addEventListener('click', (event) => {
			if (!this.isDescendant(this.el.nativeElement, event.target)) {
				this.d3.close();
			}
		});
	}

	isDescendant(parent, child) {
		let node = child.parentNode;
		while (node != null) {
			if (node == parent) {
				return true;
			}
			node = node.parentNode;
		}
		return false;
	}

	format(value) {

	}

	parse(value: Time): NgbTime {
		return new NgbTime(1, 2);
	}
}
