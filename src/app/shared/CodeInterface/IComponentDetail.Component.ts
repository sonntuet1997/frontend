// import { IEntity } from "./IEntity.Entity";
// import { PagingModel } from "../MaterialComponent/paging/paging.model";
// import { HttpService } from "../HttpService";
// import { BottomToastsManager } from "../CustomToaster";
// import { ChangeDetectorRef, ViewContainerRef } from "@angular/core";
// import { ISearchEntity } from "./ISearchEntity.Entity";
//
// export class IComponentDetail<T extends IEntity> {
//     PagingModel: PagingModel = new PagingModel(7, 10);
//     entities: T[];
//     temp: T;
//
//     constructor(public HttpService: HttpService<T>, public cd: ChangeDetectorRef, public toastr: BottomToastsManager, public vcr: ViewContainerRef) {
//         this.toastr.setRootViewContainerRef(vcr);
//     }
//
//     Search(SearchEntity?: ISearchEntity, IsPaging?: boolean) {
//         SearchEntity.Skip = IsPaging ? this.PagingModel.Take * this.PagingModel.Active : 0;
//         SearchEntity.Take = this.PagingModel.Take;
//         this.HttpService.Gets(SearchEntity).subscribe(p => {
//             this.entities = p;
//             this.toastr.ShowSuccess();
//         }, e => {
//             this.toastr.ShowError(e);
//         });
//         this.Count(SearchEntity);
//     }
//
//     Count(SearchEntity?: ISearchEntity) {
//         this.HttpService.Count(SearchEntity).subscribe(data => {
//             this.PagingModel.TotalPage = Math.ceil(data / this.PagingModel.Take);
//         });
//     }
//
//     Edit(T: T) {
//         this.temp = JSON.parse(JSON.stringify(T));
//         T.IsEdit = true;
//     }
//
//     Add(T: any) {
//         this.entities.unshift(T);
//     }
//
//     Delete(T: T) {
//         this.HttpService.Delete(T.Id).subscribe(p => {
//             let indexOf = this.entities.indexOf(T);
//             this.entities.splice(indexOf, 1);
//             this.toastr.ShowSuccess();
//         }, e => {
//             this.toastr.ShowError(e);
//         });
//     }
//
//     Save(T: T) {
//         if (T.Id === undefined || T.Id === null || T.Id == 0) {
//             this.HttpService.Create(T).subscribe(p => {
//                 if (this.entities != null) {
//                     this.entities[0] = p;
//                     this.entities[0].IsEdit = false;
//                 } else {
//                     T = p;
//                 }
//                 this.toastr.ShowSuccess();
//             }, e => {
//                 this.toastr.ShowError(e);
//             });
//         } else {
//             this.HttpService.Update(T).subscribe(p => {
//                 if (this.entities != null) {
//                     for (let i = 0; i < this.entities.length; i++) {
//                         if (this.entities[i].Id == p.Id) {
//                             this.entities[i] = p;
//                             this.entities[i].IsEdit = false;
//                         }
//                     }
//                 } else {
//                     T = p;
//                 }
//                 this.toastr.ShowSuccess();
//             }, e => {
//                 this.toastr.ShowError(e);
//             });
//         }
//     }
//
//     Cancel(T: T) {
//         if (T.Id === undefined || T.Id === null) {
//             this.entities.splice(0, 1);
//         } else {
//             for (let i = 0; i < this.entities.length; i++) {
//                 if (this.entities[i].Id == this.temp.Id) {
//                     this.entities[i] = this.temp;
//                     this.entities[i].IsEdit = false;
//                 }
//             }
//         }
//     }
// }
