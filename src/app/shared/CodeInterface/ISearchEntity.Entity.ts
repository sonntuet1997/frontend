import {HttpParams} from '@angular/common/http';

export class ISearchEntity {
	Skip: number;
	Take: number;
	OrderBy: string;
	OrderType: string;

	constructor(ISearch: any = null) {
		if (ISearch == null) {
			this.Skip = 0;
			this.Take = 10;
			this.OrderBy = 'Id';
			this.OrderType = 'None';
		} else {
			this.Skip = ISearch.Skip;
			this.Take = ISearch.Take;
			this.OrderBy = ISearch.OrderBy;
			this.OrderType = ISearch.OrderType;
		}
	}

	ToParams(): HttpParams {
		let params = new HttpParams();
		for (const key in this) {
			if (this.hasOwnProperty(key) && this[key.toString()] != null) {
				params = params.set(key, this[key.toString()]);
			}
		}
		return params;
	}
}

