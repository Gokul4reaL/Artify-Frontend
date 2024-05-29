import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NFTComponent } from './components/nft/nft.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { AuctionsComponent } from './components/auctions/auctions.component';
import { EtherPipe } from './pipes/ether.pipe';
import { CreateNftComponent } from './components/create-nft/create-nft.component';
import { LoginComponent } from './components/admin/login/login.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { CreateAdminProfileComponent } from './components/admin/create-admin-profile/create-admin-profile.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { MaintainNftsComponent } from './components/admin/maintain-nfts/maintain-nfts.component';
import { CreateEditAuctionsComponent } from './components/admin/create-edit-auctions/create-edit-auctions.component';
import { AuctionsOverlayComponent } from './components/admin/auctions-overlay/auctions-overlay.component';
import { StyleTransferComponent } from './components/style-transfer/style-transfer.component';
import { MultiStyleTransferComponent } from './components/multi-style-transfer/multi-style-transfer.component';
import { ExploreNftsComponent } from './components/explore-nfts/explore-nfts.component';
import { AuctionPreviewComponent } from './components/auction-preview/auction-preview.component';


@NgModule({
  declarations: [    
    AppComponent,
    LandingPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    CreateProfileComponent,
    NFTComponent,
    DashboardComponent,
    AuctionsComponent,
    EtherPipe,
    CreateNftComponent,
    LoginComponent,
    RegisterComponent,
    CreateAdminProfileComponent,
    AdminDashboardComponent,
    MaintainNftsComponent,
    CreateEditAuctionsComponent,
    AuctionsOverlayComponent,
    StyleTransferComponent,
    MultiStyleTransferComponent,
    ExploreNftsComponent,
    AuctionPreviewComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
