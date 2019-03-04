// import 'rxjs/Rx';
// import { Observable } from 'rxjs/Rx';
// import { Injectable } from '@angular/core';
// import { HttpService } from "../HttpService";
// import { HttpClient } from "@angular/common/http";
// import { IEntity } from "./IEntity.Entity";
// import { ISearchEntity } from "./ISearchEntity.Entity";
// import { SampleEntity } from "./SampleEntity";
//
// @Injectable()
// export class IService<Entity extends IEntity, SearchEntity extends ISearchEntity> extends HttpService {
//    constructor(private Http: HttpClient, public url: string) {
//        super(Http);
//    }
//
//    GetNewInstance(item): Entity {
//        let instance: any = SampleEntity[this.constructor.name.split("Service")[0] + "Entity"];
//        let newInstance = instance.CreateEntity();
//        instance.constructor.apply(newInstance, [item]);
//        return newInstance;
//    }
//
//    Get(SearchEntity: ISearchEntity, IsShowLoading?: boolean): Observable<Entity[]> {
//        return this.Gets(this.url, SearchEntity === undefined ? null : SearchEntity.ToParams(), IsShowLoading)
//            .map(res => {
//                return ((res as any).body as Array<Entity>).map((item: any) => {
//                    return this.GetNewInstance(item);
//                });
//            });
//    }
//
//    Count(SearchEntity: ISearchEntity, IsShowLoading?: boolean): Observable<number> {
//        SearchEntity = SearchEntity === undefined ? new ISearchEntity() : SearchEntity;
//        return this.Gets(this.url + "/Count", SearchEntity === undefined ? null : SearchEntity.ToParams(), IsShowLoading)
//            .map(res => (res as any).body as number);
//    }
//
//    GetId(Id: string, IsShowLoading?: boolean): Observable<Entity> {
//        return this.get(`${this.url}/${Id}`, null, IsShowLoading)
//            .map(res => {
//                return this.GetNewInstance((res as any).body);
//            });
//    }
//
//
//    Create(data: Entity, IsShowLoading?: boolean): Observable<Entity> {
//        return this.post(`${this.url}`, data, null, IsShowLoading)
//            .map(res => {
//                return this.GetNewInstance((res as any).body);
//            })
//    }
//
//    Update(data: Entity, IsShowLoading?: boolean): Observable<Entity> {
//        return this.put(`${this.url}/${data.Id}`, data, null, IsShowLoading)
//            .map(res => {
//                return this.GetNewInstance((res as any).body);
//            })
//    }
//
//    Delete(data: Entity, IsShowLoading?: boolean): Observable<any> {
//        return this.delete(`${this.url}/${data.Id}`, null, IsShowLoading)
//            .catch(e => Observable.throw(e));
//    }
//
// }
