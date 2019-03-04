import {ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {OnInit} from '@angular/core/src/metadata/lifecycle_hooks';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {HttpService} from '../../HttpService';
import {ISearchEntity} from '../../CodeInterface/ISearchEntity.Entity';
import {Subject} from 'rxjs/Subject';
import {IEntity} from '../../CodeInterface/IEntity.Entity';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {noop} from 'rxjs/util/noop';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => NgSelectCustomComponent),
	multi: true
};

@Component({
	selector: 'ng-select-custom',
	templateUrl: './ng-select-custom.component.html',
	styleUrls: ['./ng-select-custom.component.css'],
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class NgSelectCustomComponent implements ControlValueAccessor, OnInit {
	@Input() Service: HttpService<IEntity> = null;
	@Input() SearchProperty: string = 'Name';
	@Input() Placeholder: string = 'Input ' + this.SearchProperty + '...';
	@Input() BindProperty: string = null;
	@Input() Take: number = 10;
	@Input() IsSearch: boolean = false;
	@Input() Disabled: boolean = false;
	@Output() Change: EventEmitter<any> = new EventEmitter();
	Entities: Array<IEntity> = [];
	TypeAhead = new Subject<string>();
	LoadingCount: boolean = false;
	IsFirstLoad: boolean = true;
	LoadingSearch: boolean = false;
	SearchEntity: ISearchEntity = new ISearchEntity();
	IsMoreItemEntity: boolean = false;
	TotalEntity: number = 0;
	private onTouchedCallback: () => void = noop;
	private onChangeCallback: (_: any) => void = noop;

	constructor(private cd: ChangeDetectorRef) {
		this.SearchEntity.Take = this.Take;
		this.TypeAhead.pipe(
			distinctUntilChanged(),
			debounceTime(200),
			switchMap(term => {
				this.LoadingSearch = true;
				this.value = term;
				this.SearchEntity.Skip = 0;
				this.Count();
				this.cd.markForCheck();
				return this.Service.Gets(this.SearchEntity, false);
			})
		).subscribe(x => {
			if (x.length == this.SearchEntity.Take) this.IsMoreItemEntity = true;
			let temp = {};
			temp[this.BindProperty] = this.SearchEntity[this.SearchProperty];
			this.Entities = this.IsSearch ? [temp as any, ...x] : [...x];
			this.LoadingSearch = false;
			this.cd.markForCheck();
		}, () => {
			this.Entities = [];
		});
	}

	// Input String used by NgModel
	get value(): any {
		return this.SearchEntity[this.SearchProperty];
	};

	//set accessor including call the onchange callback
	set value(v: any) {
		this.SearchEntity[this.SearchProperty] = v;
	}

	@Input()
	set Init(obj: any) {
		if (this.SearchEntity == null) this.SearchEntity = new ISearchEntity();
		Object.assign(this.SearchEntity, obj);
	};

	writeValue(obj: any): void {
		let temp = obj;
	}

	registerOnChange(fn: any): void {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouchedCallback = fn;
	}

	ngOnInit(): void {
		if (this.Service == null) console.error('Service null');
		if (this.IsSearch) {
			let t = {};
			t[this.SearchProperty] = '';
			if (this.IsSearch) this.Entities.push(t as any);
		}
	}

	public FirstLoad() {
		if (this.IsFirstLoad) {
			this.IsFirstLoad = false;
			this.LoadingSearch = true;
			this.SearchEntity.Skip = 0;
			this.Count();
			this.Service.Gets(this.SearchEntity, false).subscribe(x => {
				if (x.length == this.SearchEntity.Take) this.IsMoreItemEntity = true;
				let temp = {};
				temp[this.BindProperty] = this.SearchEntity[this.SearchProperty];
				this.Entities = this.IsSearch ? [temp as any, ...x] : [...x];
				this.LoadingSearch = false;
				this.cd.markForCheck();
			}, () => {
				this.Entities = [];
			});
		}
	}

	public FetchMore() {
		if (this.IsMoreItemEntity == true) {
			this.SearchEntity.Skip += this.SearchEntity.Take;
			this.LoadingSearch = true;
			this.Service.Gets(this.SearchEntity, false).subscribe(x => {
				this.Entities = [...this.Entities, ...x];
				if (x.length == 0) this.IsMoreItemEntity = false;
				this.LoadingSearch = false;
				this.cd.markForCheck();
			});
		}
	}

	public Count() {
		this.LoadingCount = true;
		this.Service.Count(this.SearchEntity, false).subscribe(x => {
			this.TotalEntity = x;
			this.LoadingCount = false;
			this.cd.markForCheck();
		});
	}

	public EmitChange(event) {
		if (event == null) {
			this.value = null;
			this.onChangeCallback(null);
			this.Change.emit(null);
			return;
		}
		this.value = event[this.SearchProperty];
		if (this.BindProperty != null) this.onChangeCallback(event[this.BindProperty]);
		else this.onChangeCallback(event);
		this.Change.emit(event);
		this.cd.markForCheck();
	}
}
