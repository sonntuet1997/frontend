export class PanelEntity {
	public title: string;
	public isNew: boolean[];
	public isShow: boolean[];
	public badges: number[];
	public url: string;
	public isAccessed: boolean;

	constructor(data: any = null) {
		if (data == null) {
			this.title = null;
			this.isNew = [];
			this.badges = [];
			this.isShow = [];
			this.url = null;
			for (let i = 0; i < 10; i++) {
				this.isNew.push(false);
				this.isShow.push(true);
				this.badges.push(0);
			}
			this.isAccessed = true;
		} else {
			this.title = data.title;
			this.isNew = data.isNew;
			this.badges = data.badges;
			this.url = data.url;
			this.isAccessed = data.isAccessed;
		}
	}
}
