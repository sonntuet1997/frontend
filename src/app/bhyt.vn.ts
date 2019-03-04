import {Asset, NetworkAdmin, Participant} from './org.hyperledger.composer.system';
import {Hospital} from './hospital.vn';

// export namespace bhyt.vn{
export class MedicalRecordField extends Asset {
	medicalRecordFieldId: string;
	name: string;
	fields: string;
	issuer: Employee;
}

export class Department extends Participant {
	departmentId: string;
	name: string;
}

export abstract class Person extends Participant {
	personId: string;
	name: string;
	identityCard: string;
	dateOfBirth: Date;
	sex: Sex;
	address: string;
	phoneNumber: string;
	email: string;
}

export class Employee extends Person {
	department: Department;
}

export class User {
	uid: string;
	name: string;
	identify: string;
	issuer: User;
	admin: NetworkAdmin;
	manager: boolean;
}

export class Log {
	uid: string;
	user: string;
	action: string;
	file: File;
	timestamp: Date;
}

export class Patient extends Person {
	religion: string;
	folk: string;
	domicile: string;
	fatherName: string;
	motherName: string;
	caregiverName: string;
	caregiverPhoneNumber: string;
	issuer: Employee;
}

export class Doctor extends Person {
	hospital: Hospital;
	issuer: Employee;
}

export enum Sex {
	Male,
	Female,
	Another,
}

// }
