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

import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {DataService} from './data.service';
import {AppComponent} from './app.component';
import {HomeComponent} from './Modules/home/home.component';
// noinspection TsLint
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgDatepickerModule} from 'ng2-datepicker';
import {NgbDateParserFormatter, NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {GMapModule} from 'primeng/gmap';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
import {
	AccordionModule,
	AutoCompleteModule,
	ButtonModule,
	CalendarModule,
	CheckboxModule,
	CodeHighlighterModule,
	ContextMenuModule,
	DataTableModule,
	DialogModule,
	DropdownModule,
	InputTextModule,
	RadioButtonModule,
	RatingModule,
	TabViewModule,
	TreeModule,
	TreeTableModule
} from 'primeng/primeng';
import {ShareRoutingModule} from './shared/share-routing.module';
import {ChartModule} from 'angular2-highcharts';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {NgbDateFRParserFormatter} from './shared/DateParseFormatter';
import {CustomCurrencyConfig} from './shared/CustomCurrencyConfig';
import {CURRENCY_MASK_CONFIG} from 'ng2-currency-mask/src/currency-mask.config';
import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';
import {BottomToastsManager} from './shared/CustomToaster';
import {FileService} from './shared/file-browser/file/File.Service';
import {DirectoryService} from './shared/file-browser/directory/directory.service';
import {FileBrowserService} from './shared/file-browser/file-browser.service';
import {AuthGuard} from './Auth.Guard.Service';
import {HeaderComponent} from './shared/main-component/Header/Header.Component';
import {ToastrModule} from 'ngx-toastr';
import {LoginComponent} from './shared/login/login.component';
import {BodyComponent} from './shared/main-component/Body/Body.Component';
import {FooterComponent} from './shared/main-component/Footer/footer.component';
import {WalletComponent} from './shared/wallet/wallet.component';
import {ModalComponent} from './shared/material-component/modal/modal.component';
import {DatetimeComponent} from './shared/material-component/datetime/datetime.component';
import {CheckboxComponent} from './shared/material-component/checkbox/checkbox.component';
import {InputfileComponent} from './shared/material-component/inputfile/inputfile.component';
import {SexPipe} from './shared/pipe/sex-pipe/sex.pipe';
import {IssueStatusPipe} from './shared/pipe/issue-status-pipe/issue-status.pipe';
import {IdentityComponent} from './shared/management-component/identity/identity.component';
import {HistorianComponent} from './shared/management-component/historian/historian.component';
import {ParsePipe} from './shared/pipe/parse-pipe/parse.pipe';
import {RequestStatusPipe} from './shared/pipe/request-status-pipe/request-status.pipe';
import {CryptoComponent} from './Modules/Crypto/Crypto.component';
import {ShareKeyComponent} from './Modules/ShareKey/ShareKey.component';
import {EncryptFileComponent} from './Modules/EncryptFile/EncryptFile.component';
import {EncryptKeyComponent} from './Modules/EncryptKey/EncryptKey.component';
import {UserComponent} from './Modules/User/User.component';
import {FileBrowserComponent} from './shared/file-browser/file-browser.component';
import {FileEncryptedComponent} from './Modules/FileEncrypted/FileEncrypted.component';
import {CreateFileEncryptedComponent} from './Modules/FileEncrypted/CreateFileEncrypted/CreateFileEncrypted.component';
import {MenuPurchaseComponent} from './shared/material-component/MenuPurchase/menupurchase.component';
import {TagsinputComponent} from './shared/material-component/tagsinput/tagsinput.component';
import {DropdownComponent} from './shared/material-component/dropdown/dropdown.component';
import {ClickOutsideDirective} from './shared/clickOutside.directive';

@NgModule({
	declarations: [
		// autogen
		AppComponent,
		HomeComponent,
		CryptoComponent,
		ShareKeyComponent,
		EncryptFileComponent,
		EncryptKeyComponent,
		UserComponent, FileEncryptedComponent, CreateFileEncryptedComponent,
		// our app
		HeaderComponent, ModalComponent, CheckboxComponent, MenuPurchaseComponent,
		BodyComponent, InputfileComponent, DatetimeComponent, TagsinputComponent,
		FooterComponent, SexPipe, IssueStatusPipe, ParsePipe, RequestStatusPipe,
		LoginComponent, FileBrowserComponent, DropdownComponent,
		WalletComponent, ClickOutsideDirective,
		HistorianComponent,
		IdentityComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AppRoutingModule, ToastrModule.forRoot(), BrowserAnimationsModule, NgbModule.forRoot(), NgDatepickerModule,
		HttpClientModule, NgSelectModule, AppRoutingModule, GMapModule,
		ConfirmationPopoverModule.forRoot({confirmButtonType: 'danger'}),
		InputTextModule, CalendarModule, ButtonModule, DataTableModule, DialogModule, TreeModule, RatingModule,
		AccordionModule, ContextMenuModule, CurrencyMaskModule, NgbTooltipModule,
		AutoCompleteModule, TabViewModule, CodeHighlighterModule,
		DropdownModule, CheckboxModule, ChartModule, RadioButtonModule, TreeTableModule, ShareRoutingModule
	],
	providers: [
		DataService,
		// our app
		{
			provide: NgbDateParserFormatter,
			useClass: NgbDateFRParserFormatter
		},
		{provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyConfig},
		{
			provide: HighchartsStatic,
			useFactory: highchartsFactory
		},
		// {
		//     provide: AuthService,
		//     useFactory: AuthFactory,
		//     deps: [Http, RoleService]
		// },
		AuthGuard,
		BottomToastsManager, FileService, FileBrowserService, DirectoryService

	],
	bootstrap: [AppComponent],
	schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}

export declare let require: any;

export function highchartsFactory() {
	const hc = require('highcharts/highstock');
	const dd = require('highcharts/modules/map');
	dd(hc);
	return hc;
}
