export class File {
	id: string;
	accessInfoList: AccessInfo[];
	metaData: any;
	checksum: string;
	logs: Log;
}


class AccessInfo {
	publicKey: string;
	encryptedKey: string;
}

class Person {
	publicKey: string;
	privateKey: string; // hidden
	ROLE: any;
}

class Log {
	timestamp: DateTime;
	action: Action;
	user: string;
}

abstract class DateTime {

}

abstract class Action {

}
