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

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './Modules/home/home.component';
// noinspection TsLint
import {HistorianComponent} from './shared/management-component/historian/historian.component';
import {IdentityComponent} from './shared/management-component/identity/identity.component';
import {CryptoComponent} from './Modules/Crypto/Crypto.component';
import {EncryptFileComponent} from './Modules/EncryptFile/EncryptFile.component';
import {EncryptKeyComponent} from './Modules/EncryptKey/EncryptKey.component';
import {ShareKeyComponent} from './Modules/ShareKey/ShareKey.component';
import {UserComponent} from './Modules/User/User.component';
import {FileEncryptedComponent} from './Modules/FileEncrypted/FileEncrypted.component';
import {CreateFileEncryptedComponent} from './Modules/FileEncrypted/CreateFileEncrypted/CreateFileEncrypted.component';

const routes: Routes = [
	{path: '', component: HomeComponent},
	{
		path: 'Crypto',
		children:
			[
				{path: '', component: CryptoComponent},
				{path: 'EncryptFile', component: EncryptFileComponent},
				{path: 'EncryptKey', component: EncryptKeyComponent},
				{path: 'ShareKey', component: ShareKeyComponent}
			]
	},
	{
		path: 'Participants',
		children:
			[
				{path: 'User', component: UserComponent},
				{path: 'Admin', component: UserComponent},
				{
					path: 'FileEncrypted', children: [
						{path: '', component: FileEncryptedComponent},
						{path: 'Create', component: CreateFileEncryptedComponent},
					]
				},
				// {path: 'Employee', component: EmployeeComponent},
				// {path: 'Patient', component: PatientComponent},
				// {path: 'Doctor', component: DoctorComponent},
				// {path: 'Hospital', component: HospitalComponent}
			]
	},
	{
		path: 'Assets',
		children:
			[
				// {path: 'MedicalRecordField', component: MedicalRecordFieldComponent, pathMatch: 'full'},
				// {path: 'MedicalRecordField/:medicalRecordFieldId', component: MedicalRecordFieldDetailComponent},
				// {path: 'MedicalRecordPatient', component: MedicalRecordPatientListComponent},
				// {path: 'MedicalRecordPatient/:medicalRecordId', component: MedicalRecordPatientDetailComponent},
				// {
				// 	path: 'MedicalRecordPatient/:medicalRecordId/MedicalResultReport/:medicalResultReportId',
				// 	component: MedicalResultReportPatientComponent
				// },
				// {path: 'MedicalRecordDoctor', component: MedicalRecordDoctorListComponent},
				// {path: 'MedicalRecordDoctor/:medicalRecordId', component: MedicalRecordDoctorDetailComponent},
				// {
				// 	path: 'MedicalRecordDoctor/:medicalRecordId/MedicalResultReport/:medicalResultReportId',
				// 	component: MedicalResultReportDoctorComponent
				// },
				// {path: 'MedicalResultReport', component: MedicalResultReportComponent},
				// {path: 'MedicalResultReportDetail', component: MedicalResultReportDetailComponent},
				// {path: 'MedicalDiagnosis', component: MedicalDiagnosisComponent}
			]
	},
	{
		path: 'Transactions',
		children:
			[
				// {path: 'CreateDepartment', component: CreateDepartmentComponent},
				// {path: 'UpdateDepartment', component: UpdateDepartmentComponent},
				// {path: 'CreateEmployee', component: CreateEmployeeComponent},
				// {path: 'UpdateEmployee', component: UpdateEmployeeComponent},
				// {path: 'CreateDoctor', component: CreateDoctorComponent},
				// {path: 'UpdateDoctor', component: UpdateDoctorComponent},
				// {path: 'CreatePatient', component: CreatePatientComponent},
				// {path: 'UpdatePatient', component: UpdatePatientComponent},
				// {path: 'CreateMedicalRecordField', component: CreateMedicalRecordFieldComponent},
				// {path: 'UpdateMedicalRecordField', component: UpdateMedicalRecordFieldComponent},
				// {path: 'CreateDemo', component: CreateDemoComponent},
				// {path: 'CreateHospital', component: CreateHospitalComponent},
				// {path: 'UpdateHospital', component: UpdateHospitalComponent},
				// {path: 'CreateMedicalRecord', component: CreateMedicalRecordComponent},
				// {path: 'UpdateMedicalRecord', component: UpdateMedicalRecordComponent},
				// {path: 'CreateMedicalResultReport', component: CreateMedicalResultReportComponent},
				// {path: 'UpdateMedicalResultReport', component: UpdateMedicalResultReportComponent},
				// {path: 'RequestViewMedicalRecord', component: RequestViewMedicalRecordComponent},
				// {path: 'AcceptRequestViewMedicalRecord', component: AcceptRequestViewMedicalRecordComponent},
				// {path: 'RejectRequestViewMedicalRecord', component: RejectRequestViewMedicalRecordComponent},
				// {path: 'CreateMedicalDiagnosis', component: CreateMedicalDiagnosisComponent}
			]
	},
	{
		path: 'Management',
		children:
			[
				{path: 'Historian', component: HistorianComponent},
				{path: 'Identity', component: IdentityComponent}
			]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})
export class AppRoutingModule {
}
