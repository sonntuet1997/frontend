import {Component, EventEmitter} from '@angular/core';
// import {EmployeeEntity} from '../../app/Modules/Employee/Employee.Entity';
import {MenuModel} from './Menu.Model';
// import {EmployeeInfoService} from '../EmployeeInfo.Service';
import {WalletService} from '../../wallet/wallet.service';
import {BottomToastsManager} from '../../CustomToaster';
import {ManagementService} from '../../management-component/management.service';
import {AppTitle, GetParticipantEnum, RoleList} from '../../../GlobalData';
import {UserService} from '../../../Modules/User/User.service';
// import {AuthService} from "../../Modules/Auth/Auth.Service";
// import {LayerAccessControlEntity} from "../../Modules/LayerAccessControl/LayerAccessControl.Entity";

@Component({
	selector: 'app-header',
	templateUrl: './Header.Component.html',
	styleUrls: ['./Header.Component.css'],
	providers: [WalletService, ManagementService, UserService]
})
export class HeaderComponent {
	MenuList: MenuModel[];
	// ParentLayerControl: LayerAccessControlEntity;
	Title: string = AppTitle;
	IsLogin = false;

	constructor(public toastr: BottomToastsManager, private ManagementService: ManagementService,
							public UserService: UserService
							// , public EmployeeInfoService: EmployeeInfoService
							// , private UserService: UserService, private PermissionService: PermissionService
							// , public AuthService: AuthService
	) {
		// if (this.UserService.UserEntity === undefined || this.UserService.UserEntity === null) {
		// } else {
		//  this.UserEntity = JSON.parse(JSON.stringify(this.UserService.UserEntity));
		//  HeaderComponent.User = JSON.parse(JSON.stringify(this.UserService.UserEntity));
		// }
		// //get quyen user
		// if (this.PermissionService.PermissionEntities === undefined || this.PermissionService.PermissionEntities === null) {
		//  this.PermissionService.GetPermissionByUser().subscribe(v => {
		//    this.PermissionService.PermissionEntities = v;
		//  })
		// } else {
		//  debugger
		//  //this.PermissionService.PermissionEntities = JSON.parse(JSON.stringify(this.PermissionService.PermissionEntities));
		// }
		const cookie = this.getCookie('access_token');
		this.IsLogin = cookie != null && cookie != '';
		this.MenuList = Array<MenuModel>();
		const Home = new MenuModel('Trang chủ', '/');
		this.MenuList.push(Home);
		const Crypto = new MenuModel('Mã hóa', 'Crypto');
		// this.MenuList.push(Crypto);
		const EncryptFile = new MenuModel('Mã hóa file', 'Crypto/EncryptFile');
		const ShareKey = new MenuModel('Chia sẻ khóa', 'Crypto/ShareKey');
		const EncryptKey = new MenuModel('Mã hóa khoá', 'Crypto/EncryptKey');
		Crypto.addSub(EncryptFile);
		Crypto.addSub(ShareKey);
		Crypto.addSub(EncryptKey);
		const File = new MenuModel('File', 'Participants/FileEncrypted');
		// this.MenuList.push(File);
		WalletService.IsLogin.subscribe(x => this.IsLogin = x);
// [IMPORT MODULE] [
		// let [MODULE] = new MenuModel("[MODULE]", "[MODULE]"); this.MenuList.push([MODULE]);
		WalletService.Role.subscribe(p => {
			this.MenuList = Array<MenuModel>();
			this.MenuList.push(Home);
			this.IsLogin = true;
			switch (p.value.toUpperCase()) {
				case 'NETWORKADMIN': {
					const Admin = new MenuModel('Quản trị người dùng', 'Participants/Admin');
					this.MenuList.push(Admin);
					const FileServer = new MenuModel('Server File', 'Participants/FileServer');
					this.MenuList.push(FileServer);
					// const Department = new MenuModel('Sở y tế', 'Participants/Department');
					// this.MenuList.push(Department);
					const Transactions = new MenuModel('Lịch sử giao dịch', 'Transactions');
					this.MenuList.push(Transactions);
					const UpdateUser = new MenuModel('Cập nhật User', 'Transactions/UpdateUser');
					Transactions.addSub(UpdateUser);
					const CreateFileServer = new MenuModel('Tạo Server File', 'Transactions/CreateFileServer');
					Transactions.addSub(CreateFileServer);
					const UpdateFileServer = new MenuModel('Cập nhật Server File', 'Transactions/UpdateFileServer');
					Transactions.addSub(UpdateFileServer);
					// const CreateDemo = new MenuModel('Tạo Demo', 'Transactions/CreateDemo');
					// Transactions.addSub(CreateDemo);
					// const CreateHospital = new MenuModel('Tạo bệnh viện', 'Transactions/CreateHospital');
					// Transactions.addSub(CreateHospital);
					// const UpdateHospital = new MenuModel('Cập nhật bệnh viện', 'Transactions/UpdateHospital');
					// Transactions.addSub(UpdateHospital);
					// const CreateDepartment = new MenuModel('Tạo cơ sở y tế', 'Transactions/CreateDepartment');
					// Transactions.addSub(CreateDepartment);
					// const UpdateDepartment = new MenuModel('Cập nhật cơ sở y tế', 'Transactions/UpdateDepartment');
					// Transactions.addSub(UpdateDepartment);
					const Crypto = new MenuModel('Mã hóa', 'Crypto');
					this.MenuList.push(Crypto);
					const EncryptFile = new MenuModel('Mã hóa file', 'Crypto/EncryptFile');
					const ShareKey = new MenuModel('Chia sẻ khóa', 'Crypto/ShareKey');
					const EncryptKey = new MenuModel('Mã hóa khoá', 'Crypto/EncryptKey');
					Crypto.addSub(EncryptFile);
					Crypto.addSub(ShareKey);
					Crypto.addSub(EncryptKey);
					const Management = new MenuModel('Quản lý', 'Management');
					this.MenuList.push(Management);
					const Historian = new MenuModel('Lịch sử', 'Management/Historian');
					Management.addSub(Historian);
					const Identities = new MenuModel('Định danh', 'Management/Identity');
					Management.addSub(Identities);
					break;
				}
				case 'MANAGER': {
					const Admin = new MenuModel('Người dùng', 'Participants/User');
					this.MenuList.push(Admin);
					// const Department = new MenuModel('Sở y tế', 'Participants/Department');
					// this.MenuList.push(Department);
					const Transactions = new MenuModel('Lịch sử giao dịch', 'Transactions');
					this.MenuList.push(Transactions);
					const UpdateUser = new MenuModel('Cập nhật User', 'Transactions/UpdateUser');
					Transactions.addSub(UpdateUser);
					// const CreateDemo = new MenuModel('Tạo Demo', 'Transactions/CreateDemo');
					// Transactions.addSub(CreateDemo);
					// const CreateHospital = new MenuModel('Tạo bệnh viện', 'Transactions/CreateHospital');
					// Transactions.addSub(CreateHospital);
					// const UpdateHospital = new MenuModel('Cập nhật bệnh viện', 'Transactions/UpdateHospital');
					// Transactions.addSub(UpdateHospital);
					// const CreateDepartment = new MenuModel('Tạo cơ sở y tế', 'Transactions/CreateDepartment');
					// Transactions.addSub(CreateDepartment);
					// const UpdateDepartment = new MenuModel('Cập nhật cơ sở y tế', 'Transactions/UpdateDepartment');
					// Transactions.addSub(UpdateDepartment);
					const Crypto = new MenuModel('Mã hóa', 'Crypto');
					this.MenuList.push(Crypto);
					const EncryptFile = new MenuModel('Mã hóa file', 'Crypto/EncryptFile');
					const ShareKey = new MenuModel('Chia sẻ khóa', 'Crypto/ShareKey');
					const EncryptKey = new MenuModel('Mã hóa khoá', 'Crypto/EncryptKey');
					Crypto.addSub(EncryptFile);
					Crypto.addSub(ShareKey);
					Crypto.addSub(EncryptKey);
					const Management = new MenuModel('Quản lý', 'Management');
					this.MenuList.push(Management);
					const Historian = new MenuModel('Lịch sử', 'Management/Historian');
					Management.addSub(Historian);
					const Identities = new MenuModel('Định danh', 'Management/Identity');
					Management.addSub(Identities);
					break;
				}
				case 'USER': {
					const File = new MenuModel('File', 'Participants/FileEncrypted');
					this.MenuList.push(File);
					// const Department = new MenuModel('Sở y tế', 'Participants/Department');
					// this.MenuList.push(Department);
					const Transactions = new MenuModel('Lịch sử giao dịch', 'Transactions');
					this.MenuList.push(Transactions);
					const AcceptProposedFileEncrypted = new MenuModel('Chấp nhận đề nghị File', 'Transactions/AcceptProposedFileEncrypted');
					Transactions.addSub(AcceptProposedFileEncrypted);
					const AcceptReadFileEncrypted = new MenuModel('Chấp nhận yêu cầu đọc File', 'Transactions/AcceptReadFileEncrypted');
					Transactions.addSub(AcceptReadFileEncrypted);
					const CreateFile = new MenuModel('Tạo File', 'Transactions/CreateFile');
					Transactions.addSub(CreateFile);
					const DeleteFile = new MenuModel('Xóa File', 'Transactions/DeleteFile');
					Transactions.addSub(DeleteFile);
					const ProposeReadFileEncrypted = new MenuModel('Yêu cầu đọc File', 'Transactions/ProposeReadFileEncrypted');
					Transactions.addSub(ProposeReadFileEncrypted);
					const RejectProposedFileEncrypted = new MenuModel('Từ chối đề nghị File', 'Transactions/RejectProposedFileEncrypted');
					Transactions.addSub(RejectProposedFileEncrypted);
					const RejectReadFileEncrypted = new MenuModel('Từ chối đọc File', 'Transactions/RejectReadFileEncrypted');
					Transactions.addSub(RejectReadFileEncrypted);
					const UpdateFile = new MenuModel('Cập nhật File', 'Transactions/UpdateFile');
					Transactions.addSub(UpdateFile);
					// const CreateHospital = new MenuModel('Tạo bệnh viện', 'Transactions/CreateHospital');
					// Transactions.addSub(CreateHospital);
					// const UpdateHospital = new MenuModel('Cập nhật bệnh viện', 'Transactions/UpdateHospital');
					// Transactions.addSub(UpdateHospital);
					// const CreateDepartment = new MenuModel('Tạo cơ sở y tế', 'Transactions/CreateDepartment');
					// Transactions.addSub(CreateDepartment);
					// const UpdateDepartment = new MenuModel('Cập nhật cơ sở y tế', 'Transactions/UpdateDepartment');
					// Transactions.addSub(UpdateDepartment);
					const Crypto = new MenuModel('Mã hóa', 'Crypto');
					this.MenuList.push(Crypto);
					const EncryptFile = new MenuModel('Mã hóa file', 'Crypto/EncryptFile');
					const ShareKey = new MenuModel('Chia sẻ khóa', 'Crypto/ShareKey');
					const EncryptKey = new MenuModel('Mã hóa khoá', 'Crypto/EncryptKey');
					Crypto.addSub(EncryptFile);
					Crypto.addSub(ShareKey);
					Crypto.addSub(EncryptKey);
					const Management = new MenuModel('Quản lý', 'Management');
					this.MenuList.push(Management);
					const Historian = new MenuModel('Lịch sử', 'Management/Historian');
					Management.addSub(Historian);
					const Identities = new MenuModel('Định danh', 'Management/Identity');
					Management.addSub(Identities);
					break;
				}
				case 'FileServer': {
					break;
				}
				default:
					break;
			}
		});
		this.ManagementService.ping().subscribe(res => {
			const sub = new EventEmitter();
			sub.subscribe(t => {
				this.toastr.ShowSuccess('Sử dụng với vai trò ' + t.name);
				WalletService.Role.emit(t);
			});
			let role = GetParticipantEnum(res);
			if (role.value == 'User') {
				this.UserService.getAll({'where': {'manager': false}}).subscribe(x => {
					if (!x.some(t => t.uid == res.participant.split('#')[1])) {
						role = RoleList[1];
					}
					sub.next(role);
				})
			} else {
				sub.next(role);
			}
			this.ManagementService.reset();
		}, error => {
			const er = error.error.error;
			const erArr = er.message.split(er.name);
			this.toastr.ShowError(erArr[erArr.length - 1]);
		});
		// let [MODULE] = new MenuModel("[MODULE]", "[MODULE]"); this.MenuList.push([MODULE]);
		// [END]
	}

	toggle(e, t) {
		if (t.hasSub() == true) {
		} else {
			if (getComputedStyle(e, null).display == 'block') {
				e.click();
				document.body.scrollTop = 0; // For Safari
				document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
			}
		}
	}

	getCookie(cname) {
		const name = cname + '=';
		const decodedCookie = decodeURIComponent(document.cookie);
		const ca = decodedCookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return '';
	}
}
