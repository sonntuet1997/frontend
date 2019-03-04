import {IEntity} from '../../CodeInterface/IEntity.Entity';

export class FileEntity extends IEntity {
	Path: string = null;
	FileName: string = null;
	Content: string = null;

	public constructor() {
		super();
	}
}
