import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-explore-nfts',
  templateUrl: './explore-nfts.component.html',
  styleUrls: ['./explore-nfts.component.less']
})
export class ExploreNftsComponent {
  nfts: any[] = [];
  showAvailableAuctionsOverlay: boolean = false;
  selectedNftId: string | null = null;
  isFetchingImages: boolean = false; // Loader for getImages


  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getNFTS();
  }

  getNFTS(): void {
    this.isFetchingImages = true; // Show loader
    this.adminService.getNFTS().subscribe((response: any) => {
      this.nfts = response;
    }).add(() => this.isFetchingImages = false); // Hide loader when request completes
  } 

  // Check if the URL starts with 'data:image/'
  isImage(url: string): boolean {
    return url.startsWith('data:image/');
  }

}
