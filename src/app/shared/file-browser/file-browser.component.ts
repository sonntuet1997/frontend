///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FileBrowserService} from './file-browser.service';
import {FileBrowserEntity} from './file-browser.entity';
import {MenuItem} from 'primeng/primeng';
import {DirectoryService} from './directory/directory.service';
import {FileEntity} from './file/File.Entity';
import {FileService} from './file/File.Service';
import {BottomToastsManager} from '../CustomToaster';
import {DirectoryEntity} from './directory/directory.entity';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {noop} from 'rxjs/util/noop';
// import { EmployeeSearchEntity } from "../../Module/MEmployee/Employee.SearchEntity";
// import { EmployeeService } from "../../Module/MEmployee/Employee.Service";
// import { EmployeeEntity } from "../../Module/MEmployee/Employee.Entity";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => FileBrowserComponent),
	multi: true
};

@Component({
	selector: 'app-file-browser',
	templateUrl: './file-browser.component.html',
	styleUrls: ['./file-browser.component.css'],
	encapsulation: ViewEncapsulation.None,
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class FileBrowserComponent implements OnInit, ControlValueAccessor {
	CurrentFile: FileBrowserEntity = new FileBrowserEntity();
	FileEntity: FileEntity = new FileEntity();
	fileBrowserEntities: FileBrowserEntity[] = [];
	items: MenuItem[];
	@ViewChild('fileInput') fileInput;
	fileMap: string[];
	selectedFileEntities: FileBrowserEntity[] = [];
	@Output() onChanges: EventEmitter<any> = new EventEmitter();
	@Output() finish: EventEmitter<any> = new EventEmitter();
	@Input() Disabled = false;
	@Input() Multiple = true;
	temp: any;
	@Input() ModalSize = 'xxl';
	private onTouchedCallback: () => void = noop;
	private onChangeCallback: (_: any) => void = noop;

	constructor(public FileBrowserService: FileBrowserService, private FileService: FileService,
							private DirectoryService: DirectoryService, private toastr: BottomToastsManager, vcr: ViewContainerRef) {
		this.Search('/Files');
	}

	writeValue(obj: any): void {
		if (obj == null) {
			return;
		}
		this.temp = obj;
		const files = obj.split(';');
		this.selectedFileEntities = files.map(f => {
			if (f == '') {
				return;
			}
			const fbe = new FileBrowserEntity();
			fbe.Src = f;
			fbe.IsSelected = true;
			return fbe;
		}).filter(f => f != null);
		if (this.fileMap == null) {
			this.Search('/Files');
		} else {
			this.Search(this.fileMap.join('/'));
		}
	}

	registerOnChange(fn: any): void {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouchedCallback = fn;
	}

	ngOnInit() {
		this.items = [
			{label: 'Rename', icon: 'fa fa-plus', command: (event) => this.RenameFolder()},
			{label: 'Xóa', icon: 'fa fa-trash', command: (event) => this.DeleteFolder()}
		];
	}

	Search(Url: string, IsCreate?: boolean) {
		let t = new FileBrowserEntity();
		t.Name = '21323';
		t.IsDirectory = false;
		t.Extension = 'xxcc';
		t.Size = 2222;
		t.LastModified = 'xxcc';
		t.Src = 'xxcc';
		this.fileBrowserEntities.push(t);
		t = new FileBrowserEntity();
		t.Name = '21323';
		t.IsDirectory = false;
		t.Extension = 'xxcc';
		t.Size = 2222;
		t.LastModified = 'xxcc';
		t.Src = 'xxcc';
		this.fileBrowserEntities.push(t);
		t = new FileBrowserEntity();
		t.Name = '21323';
		t.IsDirectory = false;
		t.Extension = 'xxcc';
		t.Size = 2222;
		t.LastModified = 'xxcc';
		t.Src = 'xxcc';
		this.fileBrowserEntities.push(t);
		t = new FileBrowserEntity();
		t.Name = '21323';
		t.IsDirectory = false;
		t.Extension = 'xxcc';
		t.Size = 2222;
		t.LastModified = 'xxcc';
		t.Src = 'xxcc';
		this.fileBrowserEntities.push(t);
		// this.FileBrowserService.getFiles(Url).subscribe(x => {
		// 	let end = Url.length;
		// 	if (Url[end - 1] == '/') {
		// 		end = end - 1;
		// 	}
		// 	this.fileMap = Url.substring(0, end).split('/');
		// 	this.fileBrowserEntities = x;
		// 	if (IsCreate == true) {
		// 		for (const item of this.fileBrowserEntities) {
		// 			if (item.IsDirectory && item.Name === 'NewFolder') {
		// 				item.IsEdit = true;
		// 			}
		// 		}
		// 	}
		// 	this.fileBrowserEntities.forEach(f => {
		// 		f.IsSelected = this.selectedFileEntities.some(ff => {
		// 			return ff.Src == f.Src;
		// 		})
		// 	})
		// });
	}

	OpenContext(a, cm, file: FileBrowserEntity) {
		if (file.IsDirectory) {
			cm.show({
				pageX: a.pageX - 100, pageY: a.pageY - 700, preventDefault: () => {
				}
			});
			a.preventDefault();
			Object.assign(this.CurrentFile, file);
		} else {
			return;
		}
	}

	goToDirectory(index) {
		let url = '';
		for (let i = 0; i <= index; i++) {
			url += this.fileMap[i] + '/';
		}
		this.Search(url);
	}


	finishTrigger() {
		this.temp = this.selectedFileEntities.map(f => f.Src).join(';');
		this.onChangeCallback(this.temp);
		this.finish.emit(this.temp);
	}

	toggleFile(file: FileBrowserEntity) {
		if (file.IsSelected) {
			file.IsSelected = false;
			this.selectedFileEntities = this.selectedFileEntities.filter(f => {
				return f.Src != file.Src;
			})
		} else {
			if (this.Multiple == false) {
				this.fileBrowserEntities.forEach(fB => fB.IsSelected = false);
				this.selectedFileEntities = [];
			}
			file.IsSelected = true;
			this.selectedFileEntities.push(file);
		}
		this.onChanges.emit(file);
	}

	AddNewFolder() {
		const Directory = new DirectoryEntity();
		Directory.Path = this.fileMap.join('/') + '/NewFolder';
		this.DirectoryService.CreateFolder(Directory).subscribe(res => {
			if (res) {
				this.Search(this.fileMap.join('/'), true);
				this.toastr.ShowSuccess();
			}
		}, err => {
			this.toastr.ShowError('Something went wrong!');
		});
	}

	RenameFolder() {
		for (const file of this.fileBrowserEntities) {
			if (file.Name === this.CurrentFile.Name) {
				file.IsEdit = true;
			}
		}
	}

	DeleteFolder() {
		const ConfirmBox = confirm('Are you sure about delete this folder?');
		if (ConfirmBox) {
			const Directory = new DirectoryEntity();
			Directory.Path = this.fileMap.join('/') + '/' + this.CurrentFile.Name;
			this.DirectoryService.DeleteFolder(Directory).subscribe(res => {
				if (res) {
					this.Search(this.fileMap.join('/'));
					this.toastr.ShowSuccess();
				}
			}, err => {
				this.toastr.ShowError('Something went wrong');
			})
		}
	}

	PostNameFolder(FileEntity: FileBrowserEntity) {
		const Directory = new DirectoryEntity();
		Directory.DestinationPath = this.fileMap.join('/') + '/' + FileEntity.Name;
		Directory.SourcePath = FileEntity.Src;
		this.DirectoryService.RenameFolder(Directory).subscribe(res => {
			if (res) {
				const Index = this.fileBrowserEntities.indexOf(FileEntity);
				this.fileBrowserEntities[Index].IsEdit = false;
				this.toastr.ShowSuccess();
			}
		}, err => {
			this.toastr.ShowError('Something went wrong!');
		})
	}

	TriggerUploadImage() {
		const fileBrowser = this.fileInput.nativeElement;
		fileBrowser.click();
	}

	getBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result.substring(reader.result.indexOf(',') + 1, reader.result.length + 1));
			reader.onerror = error => reject(error);
		});
	}


	UploadImage(event) {
		const fileList: FileList = event.target.files;
		if (fileList.length > 0) {
			const file: File = fileList[0];
			const ConfirmBox = confirm('Are you sure about upload this image?');
			if (ConfirmBox) {
				this.getBase64(file).then((data: string) => {
					this.FileEntity.FileName = file.name;
					this.FileEntity.Path = this.fileMap.join('/');
					this.FileEntity.Content = data;
					this.FileService.UploadFile(this.FileEntity).subscribe(res => {
						if (res) {
							this.toastr.ShowSuccess();
							this.Search(this.fileMap.join('/'));
						}
					})
				});
			} else {
				return
			}
		}
	}
}
