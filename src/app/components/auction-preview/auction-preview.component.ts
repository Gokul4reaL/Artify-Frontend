import { Component } from '@angular/core';
import { AuctionService } from 'src/app/services/auction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auction-preview',
  templateUrl: './auction-preview.component.html',
  styleUrls: ['./auction-preview.component.less']
})
export class AuctionPreviewComponent {
  auctions: any[] = [];

  constructor(private auctionService: AuctionService, private router : Router) {}

  ngOnInit(): void {
    this.loadActiveAuctions();
  }

  loadActiveAuctions(): void {
    this.auctionService.getActiveAuctions().subscribe({
      next: (data) => {
        this.auctions = data.map((auction: any) => ({...auction, showDetails: false}));
      },
      error: (error) => {
        console.error('Failed to fetch auctions:', error);
      }
    });
  }

  toggleDetails(auction: any): void {
    auction.showDetails = !auction.showDetails;
  }

  joinAuction(auctionId: any) {
    localStorage.setItem('auctionID', auctionId);
    this.router.navigate(['/auctions']);
  }
}
