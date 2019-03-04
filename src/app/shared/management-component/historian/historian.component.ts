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

import {Component} from '@angular/core';
import {HistorianService} from './historian.service';
import 'rxjs/add/operator/toPromise';
import {BottomToastsManager} from '../../CustomToaster';
import {HistorianRecord} from '../../../org.hyperledger.composer.system';
import {IComponent} from '../../CodeInterface/IComponent.Component';

@Component({
	selector: 'app-historian',
	templateUrl: './historian.component.html',
	styleUrls: ['./historian.component.css'],
	providers: [HistorianService]
})
export class HistorianComponent extends IComponent<HistorianRecord> {
	public title = 'Lịch sử';

	constructor(historianService: HistorianService, toastr: BottomToastsManager) {
		super(toastr);
		this.getService = historianService;
		this.search();
	};
}
