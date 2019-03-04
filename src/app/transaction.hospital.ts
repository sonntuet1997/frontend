import {Event} from './org.hyperledger.composer.system';
import {Employee} from './bhyt.vn';

// export namespace transaction.hospital{
export class CreateEmployeeEvent extends Event {
	employee: Employee;
}

export class UpdateEmployeeEvent extends Event {
	employee: Employee;
}

// }
