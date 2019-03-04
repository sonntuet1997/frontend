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
import {DataService} from '../../../data.service';
import {UpdateUserComponent} from './UpdateUser.component';
import {UpdateUserService} from './UpdateUser.service';

describe('UpdateUserComponent', () => {
	let component: UpdateUserComponent;
	let fixture: ComponentFixture<UpdateUserComponent>;

	let mockCreateDemoService;
	let mockDataService

	beforeEach(async(() => {

		mockCreateDemoService = sinon.createStubInstance(UpdateUserService);
		mockCreateDemoService.getAll.returns([]);
		mockDataService = sinon.createStubInstance(DataService);

		TestBed.configureTestingModule({
			declarations: [UpdateUserComponent],
			imports: [
				BrowserModule,
				FormsModule,
				ReactiveFormsModule,
				HttpModule
			],
			providers: [
				{provide: UpdateUserService, useValue: mockCreateDemoService},
				{provide: DataService, useValue: mockDataService},
			]
		});

		fixture = TestBed.createComponent(UpdateUserComponent);
		component = fixture.componentInstance;

	}));


	it('should create', () => {
		expect(component).toBeTruthy();
	});

});

