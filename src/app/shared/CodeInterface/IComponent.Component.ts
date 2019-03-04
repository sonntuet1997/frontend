import {BottomToastsManager} from '../CustomToaster';
import {ISearchEntity} from './ISearchEntity.Entity';

export class IComponent<T extends Object> {
	// PagingModel: PagingModel = new PagingModel(7, 10);
	entities: T[];
	temp: T;
	tempIndex: number;
	getService: any;
	createService: any;
	updateService: any;

	constructor(public toastr: BottomToastsManager) {
	}

	search(SearchEntity?: ISearchEntity, IsPaging?: boolean) {
		// SearchEntity.Skip = IsPaging ? this.PagingModel.Take * this.PagingModel.Active : 0;
		// SearchEntity.Take = this.PagingModel.Take;
		this.getService.getAll().subscribe(p => {
			this.entities = p;
			this.toastr.ShowSuccess();
		}, e => {
			this.toastr.ShowError(e);
		});
		// this.Count(SearchEntity);
	}

	// Count(SearchEntity?: ISearchEntity) {
	//     this.HttpService.Count(SearchEntity).subscribe(data => {
	//         this.PagingModel.TotalPage = Math.ceil(data / this.PagingModel.Take);
	//     });
	// }

	edit(T: T, index: number) {
		this.temp = JSON.parse(JSON.stringify(T));
		T['Action'] = 'EDIT';
		this.tempIndex = index;
	}

	add(T: any) {
		this.entities.unshift(T);
	}

	// delete(T: T) {
	// 	this.service.Delete(T.Id).subscribe(p => {
	// 		let indexOf = this.entities.indexOf(T);
	// 		this.entities.splice(indexOf, 1);
	// 		this.toastr.ShowSuccess();
	// 	}, e => {
	// 		this.toastr.ShowError(e);
	// 	});
	// }

	save(T: T) {
		const x = Object.assign({}, T);
		x['Action'] = undefined;
		x['$class'] = undefined;
		if (T['Action'] == 'CREATE') {
			this.createService.addTransaction(x).subscribe(p => {
				// if (this.entities != null) {
				// 	this.entities[0] = x;
				// } else {
				// 	T = x;
				// }
				// this.toastr.ShowSuccess();
				this.search();
			}, e => {
				const er = e.error.error;
				const erArr = er.message.split(er.name);
				this.toastr.ShowError(erArr[erArr.length - 1]);
			});
		} else {
			this.updateService.addTransaction(x).subscribe(p => {
				if (this.entities != null) {
					this.entities[this.tempIndex] = x;
				} else {
					T = x;
				}
				this.toastr.ShowSuccess();
			}, e => {
				const er = e.error.error;
				const erArr = er.message.split(er.name);
				this.toastr.ShowError(erArr[erArr.length - 1]);
			});
		}
	}

	cancel(T: T) {
		if (T['Action'] == 'CREATE') {
			this.entities.splice(0, 1);
		} else {
			this.entities[this.tempIndex] = this.temp;
		}
	}
}
