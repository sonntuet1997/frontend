import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShareComponent} from './share.component';
import {NotFoundModule} from './not-found/not-found.module';
import {HomeComponent} from './home/home.Component';
import {LoginComponent} from './login/login.component';
import {WalletComponent} from './wallet/wallet.component';

const routes: Routes = [

	{path: 'login', component: LoginComponent, outlet: 'login'},
	{path: 'wallet', component: WalletComponent, outlet: 'login'},
	{
		path: '**',
		redirectTo: '/(status:404)',
		pathMatch: 'full',
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes), NotFoundModule],
	declarations: [ShareComponent, HomeComponent],
	exports: [RouterModule]
})

export class ShareRoutingModule {
}
