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

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as sinon from 'sinon';
import {HistorianComponent} from './historian.component';
import {HistorianService} from './historian.service';
import {DataService} from '../../../data.service';

describe('IdentityComponent', () => {
	let component: HistorianComponent;
	let fixture: ComponentFixture<HistorianComponent>;

	let mockUpdatePatientService;
	let mockDataService

	beforeEach(async(() => {

		mockUpdatePatientService = sinon.createStubInstance(HistorianService);
		mockUpdatePatientService.getAll.returns([]);
		mockDataService = sinon.createStubInstance(DataService);

		TestBed.configureTestingModule({
			declarations: [HistorianComponent],
			imports: [
				BrowserModule,
				FormsModule,
				ReactiveFormsModule,
				HttpModule
			],
			providers: [
				{provide: HistorianService, useValue: mockUpdatePatientService},
				{provide: DataService, useValue: mockDataService},
			]
		});

		fixture = TestBed.createComponent(HistorianComponent);
		component = fixture.componentInstance;

	}));


	it('should create', () => {
		expect(component).toBeTruthy();
	});

});

