import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


// stub testing values
const orcGbRatio: number = 0.5;
const orcUSDRatio: number = 0.25;
const WALLET_ADDRESS: string = '0x177b46f8fCf57C5CA32747ecf57ed359481b16eD';

/**
* Service for handling a user's wallet.
* Currently just a mock
*/
@Injectable()
export class WalletService {

  private orcBalance: number = 173.4;
  private

  constructor() { }

  /**
  * [getOrcBalance description]
  * TODO: return as observable
  * @return [description]
  */
  getOrcBalance(): number {
    return this.orcBalance;
  }

  getGBRemaining(): number {
    return this.orcBalance * orcGbRatio;
  }

  getUSDBalance(): number {
    return this.orcBalance * orcUSDRatio;
  }

  getWalletAddress(): string {
    return WALLET_ADDRESS;
  }

  /**
  * Debits the specified amount from the user's wallet
  * TODO: mock function
  * @param  amount amount to debit
  * @return        A promise
  */
  debitOrc(amount: number): Promise<string> {
    if (amount > this.orcBalance){
      return Promise.reject('You do not have enough credits');
    }

    this.orcBalance = this.orcBalance - amount;
    return Promise.resolve('')
  }

  creditOrc(amount: number): Promise<string> {
    this.orcBalance += amount;
    return Promise.resolve('');
  }
}
