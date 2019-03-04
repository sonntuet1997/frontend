import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './not-found.component';

const routes: Routes = [
	{path: '404', component: NotFoundComponent, outlet: 'status'},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class NotFoundRoutingModule {
}
