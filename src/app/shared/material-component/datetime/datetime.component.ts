import {Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {noop} from 'rxjs/util/noop';
import {NgbDateISOParserFormatter} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => DatetimeComponent),
	multi: true
};

@Component({
	selector: 'datetime',
	templateUrl: './datetime.component.html',
	styleUrls: ['./datetime.component.css'],
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DatetimeComponent implements ControlValueAccessor, OnInit {
	@Input() placeholder: string = '';
	@Input() disabled: boolean = false;
	@ViewChild('d3') d3;
	private onTouchedCallback: () => void = noop;
	private onChangeCallback: (_: any) => void = noop;
	private ngbDateISOParserFormatter = new NgbDateISOParserFormatter();
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
			this.onChangeCallback(this.ngbDateISOParserFormatter.format(v));
		}
	}

	//Set touched on blur
	onBlur() {
		this.onTouchedCallback();
	}

	//From ControlValueAccessor interface
	writeValue(value: any) {
		if (value == null) {
			this.innerValue = null;
		} else if ((typeof value) != 'string') {
			this.innerValue = {year: value.getFullYear(), month: value.getMonth() + 1, day: value.getDate()}
		} else if (this.ngbDateISOParserFormatter.parse(value) !== this.innerValue) {
			this.innerValue = this.ngbDateISOParserFormatter.parse(value);
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
}
