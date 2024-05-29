import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-maintain-nfts',
  templateUrl: './maintain-nfts.component.html',
  styleUrls: ['./maintain-nfts.component.less']
})
export class MaintainNftsComponent {
  nfts: any[] = [];
  showAvailableAuctionsOverlay: boolean = false;
  selectedNftId: string | null = null;
  isFetchingImages: boolean = false; // Loader for getImages

  constructor(private adminService: AdminService) { 
    this.getNFTS();
  }

  getNFTS(): void {
    this.isFetchingImages = true; // Show loader
    this.adminService.getNFTS().subscribe((response: any) => {
      this.nfts = response;
  }).add(() => this.isFetchingImages = false); // Hide loader when request completes;
  }

  addToAuction(data: any) {
    this.selectedNftId = data.nft_id;
    this.showAvailableAuctionsOverlay = true;
  } 

  // Check if the URL starts with 'data:image/'
  isImage(url: string): boolean {
    return url.startsWith('data:image/');
  }
}