import {Event, Transaction} from './org.hyperledger.composer.system';
import {MedicalRecord, MedicalResultReport} from './hospital.vn';
import {Doctor, MedicalRecordField, Patient} from './bhyt.vn';

// export namespace transaction.doctor{
export class CreateMedicalResultReport extends Transaction {
	medicalResultReportId: string;
	data: string;
	medicalRecord: MedicalRecord;
	medicalRecordField: MedicalRecordField;
}

export class UpdateMedicalRecordEvent extends Event {
	medicalRecord: MedicalRecord;
}

export class CreateMedicalResultReportEvent extends Event {
	medicalResultReport: MedicalResultReport;
}

export class UpdateMedicalResultReport extends Transaction {
	medicalResultReportId: string;
	data: string;
	medicalRecord: MedicalRecord;
	medicalRecordField: MedicalRecordField;
}

export class UpdateMedicalResultReportEvent extends Event {
	medicalResultReport: MedicalResultReport;
}

export class RequestViewMedicalRecord extends Transaction {
	medicalRecordId: string;
}

export class RequestViewMedicalRecordEvent extends Event {
	patient: Patient;
	doctor: Doctor;
	medicalRecord: MedicalRecord;
}

// }
