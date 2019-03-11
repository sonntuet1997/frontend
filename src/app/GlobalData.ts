export const AppTitle = 'Medical Record';


export function GetParticipantEnum(res) {
	const x = res.participant.split('.');
	const xx = x[x.length - 1];
	const xxx = xx.split('#');
	return RoleList.find(x => x.value == xxx[0]);
}


export const ParticipantClassNameList = [
	{value: 'org.hyperledger.composer.system.NetworkAdmin', name: 'Quản trị hệ thống'},
	{value: 'manager.FileServer', name: 'File Server'},
	{value: 'manager.User', name: 'Quản trị người dùng'},
	{value: 'manager.User', name: 'Người dùng'}
];

export const SexList = [
	{value: 'Male', name: 'Nam'},
	{value: 'Female', name: 'Nữ'},
	{value: 'Another', name: 'Khác'},
];

export const ActionList = [
	{value: 'APPROVE_UPDATE', name: 'Đồng ý thay đổi'},
	{value: 'APPROVE_READ_PROPOSE', name: 'Đồng ý đọc'},
	{value: 'REJECT_UPDATE', name: 'Từ chối thay đổi'},
	{value: 'REJECT_READ_PROPOSE', name: 'Từ chối đọc'},
	{value: 'CREATE', name: 'Tạo'},
	{value: 'PROPOSE_UPDATE', name: 'Đề nghị thay đổi'},
	{value: 'DELETE', name: 'Xóa'},
	{value: 'DOWNLOAD', name: 'Tải xuống'},
	{value: 'READ_PROPOSE', name: 'Yêu cầu đọc'},
];

export const IssueStatusList = [
	{value: 'ACTIVATED', name: 'Đang sử dụng'},
	{value: 'REVOKED', name: 'Đã thu hồi'},
	{value: 'ISSUED', name: 'Chưa sử dụng'},
	{value: 'BOUND', name: 'Đã được gắn với một định danh sẵn có'},
];


export const DataTypeList = [
	{value: 'string', name: 'chữ'},
	{value: 'number', name: 'số'},
	{value: 'boolean', name: 'đúng/sai'},
	{value: 'datetime', name: 'ngày tháng'},
	{value: 'enum', name: 'bộ giá trị'}
];

export const TrueFalseList = [
	{value: true, name: 'Có'},
	{value: false, name: 'Không'}
];

export const RoleList = [
	{value: 'User', name: 'Nhân viên'},
	{value: 'Manager', name: 'Quản trị người dùng'},
	{value: 'NetworkAdmin', name: 'Quản trị hệ thống'},
	{value: 'FileServer', name: 'File Server'},
];


export const RequestStatusList = [
	{value: 'REJECTED', name: 'Đã từ chối'},
	{value: 'ACCEPTED', name: 'Đã đồng ý'},
	{value: 'AWAITING_APPROVAL', name: 'Đang chờ chấp thuận'},
];
