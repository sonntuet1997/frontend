import {Event, Transaction} from './org.hyperledger.composer.system';
import {Doctor, MedicalRecordField, Patient, Sex} from './bhyt.vn';
import {Hospital} from './hospital.vn';

// export namespace transaction.employee{
export class CreateDoctor extends Transaction {
	personId: string;
	name: string;
	identityCard: string;
	dateOfBirth: Date;
	sex: Sex;
	address: string;
	phoneNumber: string;
	email: string;
	hospital: Hospital;
}

export class CreateDoctorEvent extends Event {
	doctor: Doctor;
}

export class UpdateDoctor extends Transaction {
	personId: string;
	name: string;
	identityCard: string;
	dateOfBirth: Date;
	sex: Sex;
	address: string;
	phoneNumber: string;
	email: string;
	hospital: Hospital;
}

export class UpdateDoctorEvent extends Event {
	doctor: Doctor;
}

export class CreatePatient extends Transaction {
	personId: string;
	name: string;
	identityCard: string;
	sex: Sex;
	dateOfBirth: Date;
	religion: string;
	folk: string;
	domicile: string;
	address: string;
	phoneNumber: string;
	email: string;
	fatherName: string;
	motherName: string;
	caregiverName: string;
	caregiverNumber: string;
}

export class CreatePatientEvent extends Event {
	patient: Patient;
}

export class UpdatePatient extends Transaction {
	personId: string;
	name: string;
	identityCard: string;
	sex: Sex;
	dateOfBirth: Date;
	religion: string;
	folk: string;
	domicile: string;
	address: string;
	phoneNumber: string;
	email: string;
	fatherName: string;
	motherName: string;
	caregiverName: string;
	caregiverNumber: string;
}

export class UpdatePatientEvent extends Event {
	patient: Patient;
}

export class CreateMedicalRecordField extends Transaction {
	medicalRecordFieldId: string;
	name: string;
	fields: string;
}

export class CreateMedicalRecordFieldEvent extends Event {
	medicalRecordField: MedicalRecordField;
}

export class UpdateMedicalRecordField extends Transaction {
	medicalRecordFieldId: string;
	name: string;
	fields: string;
}

export class UpdateMedicalRecordFieldEvent extends Event {
	medicalRecordField: MedicalRecordField;
}

// }
