import { Injectable } from '@angular/core';
import {BehaviorSubject } from 'rxjs/BehaviorSubject';


const gbOrcRatio: number = 5.899;
const usdOrcRatio: number = 6.685;
const WALLET_ADDRESS: string = '0x177b46f8fCf57C5CA32747ecf57ed359481b16eD';

const MOCK_ORC_BALANCE_KEY: string = 'MOCK_ORC_BALANCE_KEY';

/**
* Service for handling a user's wallet.
* Currently just a mock
*/
@Injectable()
export class WalletService {

  private orcBalance: number = null;

  public octBalanceBehaviorSubject: BehaviorSubject<number>;

  constructor() {
    this.octBalanceBehaviorSubject = new BehaviorSubject(this.orcBalance);
    var amt = window.localStorage.getItem(MOCK_ORC_BALANCE_KEY);

    if (amt) {
      this.orcBalance = Number(amt);
      this.octBalanceBehaviorSubject.next(this.orcBalance);
    } else {
      this.octBalanceBehaviorSubject.next(0);
    }
  }

  /**
   * @return The user's OCT balance. null if the user has not yet purchased any ORC
  */
  getOctBalance(): number {
    return this.orcBalance;
  }

  /**
   * Get the remaining GB.
   * @return The amount of remaining GB. null if the user has not yet purchased any OCT
   */
  getGBRemaining(): number {
    return this.orcBalance === null ? null : this.orcBalance * gbOrcRatio;
  }

  getUSDBalance(): number {
    return this.orcToUSD(this.orcBalance);
  }

  /**
   * Returns the value of ORC in US Dollars
   * Probably this function will be replaced by a more general currency function
   * @param  orc The amount of ORC
   * @return     The amount of USD
   */
  orcToUSD(orc: number): number {
    if (orc == null) {
      return null;
    }
    return orc * usdOrcRatio;
  }

  getWalletAddress(): string {
    return WALLET_ADDRESS;
  }

  /// Mock; holds transactions
  private  transactions: object[] = [];

  /** get a list of getTransactions
   * TODO: create transaction type
   * TODO: this will need parameters
  */
  getTransactions(): object[] {
    return this.transactions;
  }

  mockSomeTransaction(): void {
    var today = new Date();

    for (let i = 0; i < 10; i ++) {
      this.transactions.push({
        from: 'X09HS7GHFFIDXIANGIA',
        to: 'F10HW40HFFIGXIACQIA',
        status: (i % 2) ? 'sent' : 'received',
        amount: 1 + i * 10.25,
        date: new Date(today.getFullYear(), today.getUTCMonth(), today.getUTCDay() - i)
      })
    }
  }

  mockTransaction(amount: number, status: string): void {
      this.transactions.push({
        from: 'X09HS7GHFFIDXIANGIA',
        to: WALLET_ADDRESS,
        status: status,
        amount: amount,
        date: new Date()
      })
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
    window.localStorage.setItem(MOCK_ORC_BALANCE_KEY, String(this.orcBalance));
    this.mockTransaction(amount, 'sent');
    this.octBalanceBehaviorSubject.next(this.orcBalance);
    return Promise.resolve('')
  }

  creditOrc(amount: number): Promise<string> {
    this.orcBalance += amount;
    this.octBalanceBehaviorSubject.next(this.orcBalance);
    window.localStorage.setItem(MOCK_ORC_BALANCE_KEY, String(this.orcBalance));
    this.mockTransaction(amount, 'received');
    return Promise.resolve('');
  }

  octInDollars(oct: number): number {
    return oct * usdOrcRatio;
  }

  dollarsInOct(dollars: number): number {
    return dollars / usdOrcRatio;
  }

}
