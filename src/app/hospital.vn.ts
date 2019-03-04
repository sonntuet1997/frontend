import {Asset, Participant} from './org.hyperledger.composer.system';
import {Doctor, MedicalRecordField, Patient} from './bhyt.vn';

// export namespace hospital.vn{
export class PermissionView {
	doctor: Doctor;
	viewRecordStatus: ViewRecordStatus;
}

export enum ViewRecordStatus {
	AWAITING_APPROVAL,
	ACCEPTED,
	REJECTED,
}

export class Hospital extends Participant {
	hospitalId: string;
	name: string;
	address: string;
}

export class MedicalRecord extends Asset {
	medicalRecordId: string;
	data: string;
	patient: Patient;
	medicalResultReports: MedicalResultReport[];
	permissionViews: PermissionView[];
}

export class MedicalResultReport extends Asset {
	medicalResultReportId: string;
	data: string;
	medicalRecordField: MedicalRecordField;
	doctor: Doctor;
}

// }
