import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


const orcGbRatio: number = 0.5;
const orcUSDRatio: number = 0.25;
/**
* Service for handling a user's wallet.
* Currently just a mock
*/
@Injectable()
export class WalletService {

  private orcBalance: number = 173.4;

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
