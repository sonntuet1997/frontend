import {Component, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {GMap} from 'primeng/gmap';
import {noop} from 'rxjs/util/noop';

declare let google: any;
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => GooglemapComponent),
	multi: true
};

@Component({
	selector: 'googlemap',
	templateUrl: './googlemap.component.html',
	styleUrls: ['./googlemap.component.css'],
	providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class GooglemapComponent implements ControlValueAccessor, OnInit {
	@ViewChild('gmap') gmap: GMap;
	@ViewChild('searchBox') searchBox: any;
	@Input() placeholder: string = '';
	@Input() height: string = '320px';
	gSearchBox: any;
	innerValue: any = new google.maps.Marker({position: {lat: 36.883707, lng: 30.689216}, title: 'Ataturk Park'});
	dialogVisible: boolean;
	options: any;
	private onTouchedCallback: () => void = noop;
	private onChangeCallback: (_: any) => void = noop;

	writeValue(obj: any): void {
		if (obj != null) {
			let temp = JSON.parse(obj);
			this.innerValue = new google.maps.Marker({position: {lat: temp.lat, lng: temp.lng}});
			this.gmap.map.setCenter({lat: temp.lat, lng: temp.lng});
			this.gmap.map.setZoom(12);
		}
	}

	registerOnChange(fn: any) {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any) {
		this.onTouchedCallback = fn;
	}

	ngOnInit() {
		this.gSearchBox = new google.maps.places.SearchBox(this.searchBox.nativeElement);
		this.gmap.onMapReady.subscribe(x => {
			this.gmap.map.setCenter({lat: this.innerValue.position.lat(), lng: this.innerValue.position.lng()});
			this.gmap.map.setZoom(12);
			this.gmap.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.searchBox.nativeElement);
			this.gmap.map.addListener('bounds_changed', () => {
				this.gSearchBox.setBounds(this.gmap.map.getBounds());
			});
			this.gSearchBox.addListener('places_changed', () => {
				let places = this.gSearchBox.getPlaces();
				if (places.length == 0) {
					return;
				}
				let bounds = new google.maps.LatLngBounds();
				let place = places[0];
				if (place.geometry.viewport) {
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}
				this.gmap.map.fitBounds(bounds);
			});
		});
	}

	handleMapClick(event) {
		this.dialogVisible = true;
		this.setLocation(new google.maps.Marker({position: {lat: event.latLng.lat(), lng: event.latLng.lng()}}));
	}

	handleOverlayClick(event) {
		let isMarker = event.overlay.getTitle != undefined;
		if (isMarker) {
			event.map.setCenter(event.overlay.getPosition());
		}
		else {
		}
	}

	handleDragEnd(event) {
	}

	zoomIn(map) {
		map.setZoom(map.getZoom() + 1);
	}

	zoomOut(map) {
		map.setZoom(map.getZoom() - 1);
	}

	clear() {
		this.innerValue = this.setLocation(null);
	}

	setLocation(location) {
		if (location !== this.innerValue) {
			this.innerValue = location;
			if (location == null) this.onChangeCallback(null);
			else this.onChangeCallback(JSON.stringify({lat: location.position.lat(), lng: location.position.lng()}));
		}
	}
}
