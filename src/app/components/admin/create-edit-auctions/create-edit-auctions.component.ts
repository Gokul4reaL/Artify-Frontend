import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GrowlService } from 'src/app/shared/growl.service';

@Component({
  selector: 'app-create-edit-auctions',
  templateUrl: './create-edit-auctions.component.html',
  styleUrls: ['./create-edit-auctions.component.less']
})
export class CreateEditAuctionsComponent {
  auctions: any[] = [];
  newAuctionName: string = '';
  newAuctionStartTime: string = '';
  newAuctionEndTime: any;
  showCreateAuctionForm: boolean = false;

  constructor(private adminService: AdminService, private growlService: GrowlService) { }

  ngOnInit(): void {
    this.loadAuctions();
  }

  loadAuctions() {
    // Call the backend service to fetch existing auctions
    this.adminService.getAuctions().subscribe((data: any) => {
      this.auctions = data;
    });
  }

  toggleCreateAuctionForm() {
    // Toggle the visibility of the create auction form
    this.showCreateAuctionForm = !this.showCreateAuctionForm;
  }

  createAuctions() {
    const payload = {
      auction_name: this.newAuctionName,
      start_time: new Date(this.newAuctionStartTime),
      end_time: null
    };

    // Call the backend service to create a new auction
    this.adminService.createAuctions(payload).subscribe((response: any) => {
      console.log('New auction created:', response);
      // Reload the auctions list after creating a new auction
      this.loadAuctions();
      // Clear the form fields
      this.clearForm();
    });
  }

  startAuction(auction: any) {
    this.adminService.startAuction(auction).subscribe((response: any) => {
      console.log('Auction Started', response);
      this.growlService.showGrowl('success','Auction Started!!!');
    })
  }

  endAuction(auction: any) {
    const payload = {
      auction_id: auction.auction_id
    }
    this.adminService.endAuction(payload).subscribe((response: any) => {
      console.log('Auction Ended', response);
      this.growlService.showGrowl('success','Auction Ended!!!');
    })
  }

  clearForm() {
    this.newAuctionName = '';
    this.newAuctionStartTime = '';
    this.newAuctionEndTime = null;
  }
}
