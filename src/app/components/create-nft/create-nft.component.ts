// Import statements remain the same

import { Component } from "@angular/core";
import { NFTService } from "src/app/services/nft.service";
import { GrowlService } from "src/app/shared/growl.service";

@Component({
  selector: 'app-create-nft',
  templateUrl: './create-nft.component.html',
  styleUrls: ['./create-nft.component.less']
})
export class CreateNftComponent {

  nftName: string = '';
  description: string = '';
  sellerId: string | null = '';
  nftItem: File | null = null;
  startingPrice: number = 0;
  soldPrice: number | null = null;
  biddingHistory: string | null = null;
  selectedFileName: string | null = null;

  constructor(private nftService: NFTService, private growlService: GrowlService) {}

  createNFT(): void {
    this.sellerId = localStorage.getItem('userId');

    if (this.nftItem) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const fileContent = fileReader.result as string;
        const newNFT = {
          nft_name: this.nftName,
          description: this.description,
          seller_id: this.sellerId,
          nft_item: {
            name: this.nftItem?.name,
            type: this.nftItem?.type,
            size: this.nftItem?.size,
            content: fileContent
          },
          starting_price: this.startingPrice,
          sold_price: this.soldPrice,
          bidding_history: this.biddingHistory
        };
        const payload = {
          name: this.nftItem?.name,
          type: this.nftItem?.type,
          size: this.nftItem?.size,
          content: fileContent
        }

        let entry = false;
        this.nftService.qualityCheck(payload).subscribe((response: any) => {
          if (response) {
            entry = true;
            if (response.message === 'Internal server error') {
              entry = false;
              this.growlService.showGrowl('error', 'Your uploaded file quality is not satisfied, if you have uploaded video or audio ensure that it exceeds 30 seconds!!!');
            } else {
              if (entry) {
                this.nftService.createNFT(newNFT).subscribe(
                  response => this.handleResponse(response),
                  error => this.handleError(error)
                );
              }
            }
          } else {
            this.growlService.showGrowl('error', 'Something Wrong Happened, Please Try Again !!!');
          }
        });
      };

      fileReader.readAsDataURL(this.nftItem); // Converts file to data URL
    } else {
      this.growlService.showGrowl('error', 'No file selected. Please select a file.');
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFileName = file ? file.name : null;
    this.nftItem = file;
  }

  handleResponse(response: any): void {
    if (response === 'success') {
      this.growlService.showGrowl('success', 'NFT created successfully!');
    } else if (response === 'NFT already exists') {
      this.growlService.showGrowl('warning', 'You have already created this NFT!');
    } else {
      this.growlService.showGrowl('error', 'Something wrong happened, please try again!');
    }
    this.resetForm();
  }

  handleError(error: any): void {
    console.error('Error creating NFT:', error);
  }

  resetForm(): void {
    this.nftName = '';
    this.description = '';
    this.sellerId = '';
    this.nftItem = null;
    this.startingPrice = 0;
    this.soldPrice = null;
    this.biddingHistory = null;
    this.selectedFileName = '';
  }
}
