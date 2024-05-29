import { Component, Input } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GrowlService } from 'src/app/shared/growl.service';

@Component({
  selector: 'app-auctions-overlay',
  templateUrl: './auctions-overlay.component.html',
  styleUrls: ['./auctions-overlay.component.less']
})
export class AuctionsOverlayComponent {
  @Input() showOverlay: boolean = false;
  auctions: any[] = [];
  @Input() nftId: string | null = null;

  constructor(private adminService: AdminService, private growlService: GrowlService) { }

  ngOnInit() {
    this.getAuctions();
  }

  getAuctions() {
    this.adminService.getAuctions().subscribe((data: any) => {
      this.auctions = data;
    });
  }

  addToAuction(auction: any) {
    const payload = {
      nft_id: this.nftId,
      auction_id: auction.auction_id
    };
    this.adminService.addToAuction(payload).subscribe((response: any) => {
      if(response === 'NFT is already added to this auction') {
        this.growlService.showGrowl('error', 'NFT Already added to this Auction !!!');
      } else if (response === 'NFT or auction not found') {
        this.growlService.showGrowl('error','NFT or Auction Not Found!!!');
      } else if (response.nft_id && response.auction_id) {
        this.growlService.showGrowl('success', 'NFT added to Auction Successfully');
      } else {
        this.growlService.showGrowl('error', 'Error in adding NFT, Please Try Later!!!');
      }
    });
  }

  closeOverlay() {
    this.showOverlay = false;
    window.location.reload();
  }

}
