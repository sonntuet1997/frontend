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

import {Injectable} from '@angular/core';
import {DataService} from '../../data.service';
import {Observable} from 'rxjs/internal/Observable';
import 'rxjs/Rx';
import {EncryptKeyEntity} from './EncryptKey.entity';

// Can be injected into a constructor
@Injectable()
export class EncryptKeyService {
	private NAMESPACE = 'encrypt-key';

	constructor(private dataService: DataService<EncryptKeyEntity>) {
	};

	public encrypt(encryptFileEntity: EncryptKeyEntity): Observable<EncryptKeyEntity> {
		return this.dataService.post('/tool-api/' + this.NAMESPACE + '/encrypt', encryptFileEntity);
	}

	public encryptAll(encryptFileEntities: EncryptKeyEntity[]): Observable<EncryptKeyEntity> {
		return this.dataService.post('/tool-api/' + this.NAMESPACE + '/encrypt-all', encryptFileEntities);
	}

	public decrypt(encryptFileEntity: EncryptKeyEntity): Observable<EncryptKeyEntity> {
		return this.dataService.post('/tool-api/' + this.NAMESPACE + '/decrypt', encryptFileEntity);
	}

}
