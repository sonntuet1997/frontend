export class FileBrowserEntity {
	Name: string;
	IsDirectory: boolean;
	Extension: string;
	Size: number;
	LastModified: string;
	Src: string;
	IsSelected = false;
	IsEdit = false;

	public constructor() {
	}
}
