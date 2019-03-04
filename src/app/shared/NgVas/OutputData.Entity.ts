export class OutputDataEntity {
	public Data: any;
	public Event: Event;

	constructor(data?: any) {
		if (data != null) {
			this.Data = data.Data;
			this.Event = data.Event;
		}
	}
}
