import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { AuctionService } from 'src/app/services/auction.service';
import 'ethereum-unit-converter';
import { GrowlService } from 'src/app/shared/growl.service';


interface BiddingHistoryEntry {
[x: number]: any;
  amount: number;
  auction_id: string;
}

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.less'],
})

export class AuctionsComponent implements OnInit {
  bidHistory: BiddingHistoryEntry[] = [];
  bidHistoryKeys: number[] = []; // Initialize bidHistoryKeys as an empty array
  accountBalance: string = '';
  auctionID: any = '';
  canEnterAuction: boolean = false;
  auctionDetails: any;
  bidAmount: number = 0;
  accountAddress: string = '';
  notifications: any;
  numBids = 1; // Variable to track the number of bids made
  timer: any;
  timeLeft: number = 30;
  strikes: number = 0;
  currentNftIndex: number = 0;


  constructor(private auctionService: AuctionService, private growlService: GrowlService) {
    this.auctionID = localStorage.getItem('auctionID');
  }

  async ngOnInit() {
    try {
      this.auctionService.getSignerInfo().subscribe((response: any) => {
        console.log(response);
        const signerInfo = response
        this.accountBalance = signerInfo.balance;
        this.canEnterAuction = parseFloat(this.accountBalance) > 0;
        if(this.canEnterAuction) {
          this.auctionService.getAuctionInfo({auction_id: this.auctionID}).subscribe((response: any) => {
            console.log("Response: ", response);
            this.auctionDetails = response;
            this.bidHistory = response.modifiedNftItems[this.currentNftIndex].bidding_history || [];
            this.bidHistoryKeys = Object.keys(this.bidHistory).map(Number);
            this.bidAmount = response.modifiedNftItems[this.currentNftIndex].starting_price;
            this.startTimer()
          })
        }
      })
      } catch (error) {
      console.error('Error:', error);
    }
  }

  async fetchAuctionDetails() {
    this.auctionService.getAuctionInfo({auction_id: this.auctionID}).subscribe((response: any) => {
      console.log("Response: ", response);
      this.auctionDetails = response;
      this.bidHistory = response.modifiedNftItems[this.currentNftIndex].bidding_history || [];
      this.bidHistoryKeys = Object.keys(this.bidHistory).map(Number);
    })
  }

  startTimer() {
    clearInterval(this.timer); // Clear any previous interval
    this.timeLeft = 30;
    this.strikes = 0;
    this.timer = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft === 20 || this.timeLeft === 10) {
        this.strikes++;
        this.growlService.showGrowl('warning', `Strike ${this.strikes}`);
      }

      if (this.timeLeft === 0) {
        this.strikes++;
        if (this.strikes === 3) {
          this.growlService.showGrowl('success','Item Sold');
        } else {
          this.growlService.showGrowl('success','Item closed without any bidders');
        }
        clearInterval(this.timer);
        this.sellItem();        
      }
    }, 1000);
  }

  placeBid(nft_id: any) {
    this.bidAmount += 10;
    const payload = {
      auction_id: this.auctionID,
      nft_id: nft_id,
      bidAmount: this.bidAmount,
    }
    this.auctionService.placeBid(payload).subscribe((response: any) => {
      console.log("Response: ", response);
      this.fetchAuctionDetails();
      this.startTimer();
    });
  }

  sellItem() {
    const payload = {
      auction_id: this.auctionID,
      nft_id: this.auctionDetails.modifiedNftItems[this.currentNftIndex].nft_id,
      sold_price: this.bidAmount
    }
  
    this.auctionService.sellItem(payload).subscribe((response: any) => {
      console.log("Response: ", response);
      if(this.auctionDetails.modifiedNftItems[this.currentNftIndex+1]){
        this.currentNftIndex++;
        this.bidAmount = this.auctionDetails.modifiedNftItems[this.currentNftIndex].starting_price; // Update bidAmount for the next item
        this.startTimer();
      } else {
        this.growlService.showGrowl('warning','No items are left in this Auction!!!');
      }
      
    })
  }
  
  async withdrawBid() {
    try {
      await this.auctionService.withdrawBid(1);
      await this.fetchAuctionDetails();
    } catch (error) {
      console.error('Error withdrawing bid:', error);
    }
  }
}
