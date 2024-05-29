import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ethers } from 'ethers';
import { environment } from 'src/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private provider!: ethers.JsonRpcProvider;
  private contract!: ethers.Contract;
  apiUrl = environment.HOST.link;
  
  constructor(private http: HttpClient) { }


  async getAccountBalance(address: string): Promise<string> {
    try {
      const balance = await this.provider.getBalance(address);
      console.log(`Fetched account balance for address ${address}: ${balance}`);
      return ethers.formatEther(balance) + ' ETH';
    } catch (error) {
      console.error('Error fetching account balance:', error);
      throw error;
    }
  }

  async fetchAuctionDetails(auctionId: number): Promise<any> {
    try {
      const auctionDetails = await this.contract['auctions'](auctionId);
      console.log(
        `Fetched auction details for auction ID ${auctionId}:`,
        auctionDetails
      );
      return auctionDetails;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      } else {
        console.error('Error fetching auction details:', error);
      }
      throw error;
    }
  }

//   async placeBid(auctionId: number, bidAmount: string, gasLimit: string, gasPrice: string): Promise<void> {
//     try {
//         // Convert bidAmount, gasLimit, and gasPrice to BigNumber for calculations
//         const bidAmountWei = BigInt(ethers.parseEther(bidAmount)); // Convert to wei
//         const gasLimitWei = BigInt(gasLimit); // Convert to BigInt
//         const gasPriceWei = BigInt(gasPrice); // Convert to BigInt

//         // Calculate the expected gas * price + value
//         const expectedCost = gasLimitWei * gasPriceWei + bidAmountWei;
//         // Calculate the expected gas * price + value
//         console.log('Expected gas * price + value:', ethers.formatEther(expectedCost), 'ETH');

//         // Prepare transaction parameters
//         const txParams = {
//             value: bidAmountWei,
//             gasLimit: gasLimitWei,
//             gasPrice: gasPriceWei
//         };

//         // Send the transaction
//         const tx = await this.contract['placeBid'](auctionId, txParams);
//         const receipt = await tx.wait(); // Wait for the transaction to be confirmed
//         console.log(receipt); // Output the transaction receipt if needed
//         console.log(`Placed bid on auction ID ${auctionId} with amount ${bidAmount} ETH`);
//     } catch (error) {
//         console.error('Error placing bid:', error);
//         throw error;
//     }
// }


  async withdrawBid(auctionId: number): Promise<void> {
    try {
      const tx = await this.contract['withdrawBid'](auctionId);
      await tx.wait();
      console.log(`Withdrew bid from auction ID ${auctionId}`);
    } catch (error) {
      console.error('Error withdrawing bid:', error);
      throw error;
    }
  }

  getSignerInfo(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl + '/getSignerInfo', {headers});
  }

  getActiveAuctions(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl + '/fetchActiveAuctions', {headers});
  }

  getAuctionInfo(payload: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + '/auctionInfo', payload, {headers});
  }

  placeBid(payload: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + '/placeBid', payload, {headers});
  }

  sellItem(payload: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + '/sellItem', payload, {headers});
  }


  async unknown1() {
    const signer = await this.provider.getSigner();
    const address = await signer.getAddress();
    const balance = await this.getAccountBalance(address);
    return { address, balance };
  }
  
}
