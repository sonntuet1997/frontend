export class DataEntity {
	name: string;
	data: string;
	length: number;
	extension: string;
	file: File;
	constructor(DataEntity?: any) {
		if (DataEntity == null) {
			this.name = null;
			this.data = null;
			this.length = null;
			this.extension = null;
			this.file = null;
		} else {
			this.name = DataEntity.name;
			this.data = DataEntity.data;
			this.length = DataEntity.length;
			this.extension = DataEntity.extension;
			this.file = DataEntity.file;
		}
	}

	GetKB(): number {
		const Result = Math.round(this.length / 1024);
		return isNaN(Result) ? 0 : Result;
	}

	GetMB(): number {
		const Result = Math.round(this.length / 1024 / 1024);
		return isNaN(Result) ? 0 : Result;
	}
}
