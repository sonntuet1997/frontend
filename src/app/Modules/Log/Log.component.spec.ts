/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as sinon from 'sinon';
import {DataService} from '../../data.service';
import {LogComponent} from './Log.component';
import {LogService} from './Log.service';
import {Observable} from 'rxjs';

describe('LogComponent', () => {
	let component: LogComponent;
	let fixture: ComponentFixture<LogComponent>;

	let mockEmployeeService;
	let mockDataService

	beforeEach(async(() => {

		mockEmployeeService = sinon.createStubInstance(LogService);
		mockEmployeeService.getAll.returns([]);
		mockDataService = sinon.createStubInstance(DataService);

		TestBed.configureTestingModule({
			declarations: [LogComponent],
			imports: [
				BrowserModule,
				FormsModule,
				ReactiveFormsModule,
				HttpModule
			],
			providers: [
				{provide: LogService, useValue: mockEmployeeService},
				{provide: DataService, useValue: mockDataService},
			]
		});

		fixture = TestBed.createComponent(LogComponent);
		component = fixture.componentInstance;

	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should update the table when a Employee is added', fakeAsync(() => {
		let loadAllSpy = sinon.stub(component, 'loadAll');
		sinon.stub(component.serviceEmployee, 'addParticipant').returns(new Observable(observer => {
			observer.next('');
			observer.complete();
		}));

		component.addParticipant({});

		tick();

		expect(loadAllSpy.callCount).toBe(1);

		loadAllSpy.restore();
	}));

	it('should update the table when a Employee is updated', fakeAsync(() => {
		let loadAllSpy = sinon.stub(component, 'loadAll');
		sinon.stub(component.serviceEmployee, 'updateParticipant').returns(new Observable(observer => {
			observer.next('');
			observer.complete();
		}));

		// mock form to be passed to the update function
		let mockForm = new FormGroup({
			personId: new FormControl('id')
		});

		component.updateParticipant(mockForm);

		tick();

		expect(loadAllSpy.callCount).toBe(1);

		loadAllSpy.restore();
	}));

	it('should update the table when a Employee is deleted', fakeAsync(() => {
		let loadAllSpy = sinon.stub(component, 'loadAll');
		sinon.stub(component.serviceEmployee, 'deleteParticipant').returns(new Observable(observer => {
			observer.next('');
			observer.complete();
		}));

		component.deleteParticipant();

		tick();

		expect(loadAllSpy.callCount).toBe(1);

		loadAllSpy.restore();
	}));

});
