import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent} from './components/register-page/register-page.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NFTComponent } from './components/nft/nft.component';
import { AuctionsComponent } from './components/auctions/auctions.component';
import { CreateNftComponent } from './components/create-nft/create-nft.component';
import { LoginComponent } from './components/admin/login/login.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { CreateAdminProfileComponent } from './components/admin/create-admin-profile/create-admin-profile.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { MaintainNftsComponent } from './components/admin/maintain-nfts/maintain-nfts.component';
import { CreateEditAuctionsComponent } from './components/admin/create-edit-auctions/create-edit-auctions.component';
import { StyleTransferComponent } from './components/style-transfer/style-transfer.component';
import { MultiStyleTransferComponent } from './components/multi-style-transfer/multi-style-transfer.component';
import { ExploreNftsComponent } from './components/explore-nfts/explore-nfts.component';
import { AuctionPreviewComponent } from './components/auction-preview/auction-preview.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'create-profile', component: CreateProfileComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'nft', component: NFTComponent},
  { path: 'auctions-preview', component: AuctionPreviewComponent},
  { path: 'auctions', component: AuctionsComponent},
  { path: 'create-nft', component: CreateNftComponent},
  { path: 'explore-nft', component: ExploreNftsComponent},
  { path: 'style-transfer', component: StyleTransferComponent},
  { path: 'multi-style-transfer', component: MultiStyleTransferComponent},
  { path: 'admin', component: LoginComponent},
  { path: 'admin/register', component: RegisterComponent},
  { path: 'admin/create-profile', component: CreateAdminProfileComponent},
  { path: 'admin/dashboard', component:AdminDashboardComponent},
  { path: 'admin/maintain-nfts', component:MaintainNftsComponent},
  { path: 'admin/create-edit-auction', component:CreateEditAuctionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
