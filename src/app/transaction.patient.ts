import {Event, Transaction} from './org.hyperledger.composer.system';
import {MedicalRecord} from './hospital.vn';
import {Doctor} from './bhyt.vn';

// export namespace transaction.patient{
export class CreateMedicalRecord extends Transaction {
	medicalRecordId: string;
	data: string;
}

export class CreateMedicalRecordEvent extends Event {
	medicalRecord: MedicalRecord;
}

export class UpdateMedicalRecord extends Transaction {
	medicalRecordId: string;
	data: string;
}

export class UpdateMedicalRecordEvent extends Event {
	medicalRecord: MedicalRecord;
}

export class AcceptRequestViewMedicalRecord extends Transaction {
	doctor: Doctor;
	medicalRecordId: string;
}

export class AcceptRequestViewMedicalRecordEvent extends Event {
	medicalRecord: MedicalRecord;
	doctor: Doctor;
}

export class RejectRequestViewMedicalRecord extends Transaction {
	medicalRecordId: string;
	doctor: Doctor;
}

export class RejectRequestViewMedicalRecordEvent extends Event {
	medicalRecord: MedicalRecord;
	doctor: Doctor;
}

// }
