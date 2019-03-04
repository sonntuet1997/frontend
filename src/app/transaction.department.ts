import {Event, Transaction} from './org.hyperledger.composer.system';
import {Employee, Sex} from './bhyt.vn';

// export namespace transaction.department{
export class CreateEmployee extends Transaction {
	personId: string;
	name: string;
	identityCard: string;
	dateOfBirth: Date;
	sex: Sex;
	address: string;
	phoneNumber: string;
	email: string;
}

export class UpdateEmployee extends Transaction {
	personId: string;
	name: string;
	identityCard: string;
	dateOfBirth: Date;
	sex: Sex;
	address: string;
	phoneNumber: string;
	email: string;
}

export class CreateEmployeeEvent extends Event {
	employee: Employee;
}

export class UpdateEmployeeEvent extends Event {
	employee: Employee;
}

// }
