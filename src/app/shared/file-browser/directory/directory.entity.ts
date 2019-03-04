import {IEntity} from '../../CodeInterface/IEntity.Entity';

export class DirectoryEntity extends IEntity {
	Path: string = null;
	SourcePath: string = null;
	DestinationPath: string = null;

	public constructor() {
		super();
	}
}
