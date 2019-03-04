import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {FileBrowserEntity} from './file-browser.entity';

@Directive({
	selector: '[File]'
})
export class FileBrowserDirective implements OnInit {
	@Input() File: FileBrowserEntity;

	constructor(private el: ElementRef) {
	}

	ngOnInit() {
		let img = this.el.nativeElement.getElementsByClassName('card-img-top')[0];
		if (this.File.IsDirectory) {
			img.src = '/assets/Closed_Folder-512.png';
		} else {
			switch (this.File.Extension.toLowerCase()) {
				case 'png':
				case 'jpg':
					img.src = this.File.Src;
					break;
			}
		}
	}
}
