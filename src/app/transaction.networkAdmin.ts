import {Event, Transaction} from './org.hyperledger.composer.system';
import {Hospital} from './hospital.vn';
import {Department} from './bhyt.vn';

// export namespace transaction.networkAdmin{
export class CreateDemo extends Transaction {
}

export class CreateHospital extends Transaction {
	hospitalId: string;
	name: string;
	address: string;
}

export class CreateHospitalEvent extends Event {
	hospital: Hospital;
}

export class UpdateHospital extends Transaction {
	hospitalId: string;
	name: string;
	address: string;
}

export class UpdateHospitalEvent extends Event {
	hospital: Hospital;
}

export class CreateDepartment extends Transaction {
	departmentId: string;
	name: string;
}

export class CreateDepartmentEvent extends Event {
	department: Department;
}

export class UpdateDepartment extends Transaction {
	departmentId: string;
	name: string;
}

export class UpdateDepartmentEvent extends Event {
	department: Department;
}

// }
