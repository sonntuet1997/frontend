export class SearchFileBrowserEntity {
	UserName: string;

	constructor(Entity: any = null) {
		this.UserName = Entity == null ? null : Entity.UserName;
	}
}
