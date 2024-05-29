import { Pipe, PipeTransform } from '@angular/core';
import { ethers } from 'ethers';

@Pipe({
  name: 'ether'
})
export class EtherPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): string {
    return ethers.formatEther(value);
  }
}
