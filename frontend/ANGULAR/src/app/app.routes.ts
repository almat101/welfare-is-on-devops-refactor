// import { Routes } from '@angular/router';
// import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
// import { HomeComponent } from './pages/home/home.component';
// import { authGuard } from './services/guard/auth.guard';
// import { PreviewComponent } from './pages/preview/preview.component';
// import { ProfileComponent } from './pages/profile/profile.component';
// import { PersonalDataComponent } from './pages/personal-data/personal-data.component';
// import { WelfareCoachComponent } from './pages/welfare-coach/welfare-coach.component';
// import { TokenCaptureComponent } from './pages/token-capture/token-capture.component';
// import { ProductComponent } from './pages/product/product.component';
// import { CategoriesComponent } from './pages/categories/categories.component';
// import { PillarsComponent } from './pages/pillars/pillars.component';
import { Routes } from '@angular/router';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './services/guard/auth.guard';
import { PreviewComponent } from './pages/preview/preview.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PersonalDataComponent } from './pages/personal-data/personal-data.component';
import { WelfareCoachComponent } from './pages/welfare-coach/welfare-coach.component';
import { TokenCaptureComponent } from './pages/token-capture/token-capture.component';
import { ProductComponent } from './pages/product/product.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { PillarsComponent } from './pages/pillars/pillars.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { GymComponent } from './pages/gym/gym.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'preview', pathMatch: 'full' },
	{
		path: 'preview',
		component: PreviewComponent
	},
	{
		path : 'activate-account',
		component: ActivateAccountComponent
	},
	{
		path : 'home',
		component: HomeComponent,
		canActivate: [authGuard]
	},
	{
		path: 'profile',
		component: ProfileComponent,
		canActivate: [authGuard]
	},
	{
		path : 'welfare-coach',
		component: WelfareCoachComponent,
		canActivate: [authGuard]
	},
	{
		path: 'personal-data',
		component: PersonalDataComponent,
		canActivate: [authGuard]
	},
	{
		path: 'token-capture',
		component : TokenCaptureComponent,
	},
	{
		path: 'home/prodotti/:product/:id',
		component: ProductComponent,
		canActivate: [authGuard]
	},
	{
		path: 'home/:pillar/:category/:id',
		component: CategoriesComponent,
		canActivate: [authGuard]
	},
	{
		path: 'home/:pillar/:id',
		component: PillarsComponent,
		canActivate: [authGuard]
	},
	{
		path: 'home/favourites',
		component: FavouritesComponent,
		canActivate: [authGuard]
	},
	{
		path: 'home/gym',
		component: GymComponent,
		canActivate: [authGuard]
	},
	{ path: '**', component: PreviewComponent },
];
