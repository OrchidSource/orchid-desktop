import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const gbOrcRatio: number = 5.899;
const usdOrcRatio: number = 6.685;
const WALLET_ADDRESS: string = '0x177b46f8fCf57C5CA32747ecf57ed359481b16eD';

const MOCK_ORC_BALANCE_KEY: string = 'MOCK_ORC_BALANCE_KEY';
const WALLET_BACKED_UP_SETTINGS_KEY: string = 'WALLET_BACKED_UP';

/**
* Service for handling a user's wallet.
* Currently just a mock
*/
@Injectable()
export class WalletService {

  private orcBalance: number = null;

  public octBalanceBehaviorSubject: BehaviorSubject<number>;

  /**
   * Indicates whether the user has gone through the wallet backup pages
   */
  public isWalletBackedUp: BehaviorSubject<boolean>;

  constructor() {
    this.octBalanceBehaviorSubject = new BehaviorSubject(this.orcBalance);
    var amt = window.localStorage.getItem(MOCK_ORC_BALANCE_KEY);

    if (amt) {
      this.orcBalance = Number(amt);
      this.octBalanceBehaviorSubject.next(this.orcBalance);
    } else {
      this.octBalanceBehaviorSubject.next(0);
    }

    // TODO: don't use localStorage to save this
    this.isWalletBackedUp = new BehaviorSubject((!!window.localStorage.getItem(WALLET_BACKED_UP_SETTINGS_KEY)));

    this.isWalletBackedUp.subscribe((val) => {
      if (val) {
        window.localStorage.setItem(WALLET_BACKED_UP_SETTINGS_KEY, 'T');
      } else {
        window.localStorage.removeItem(WALLET_BACKED_UP_SETTINGS_KEY);
      }
    })

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
  private transactions: object[] = [];

  /** get a list of getTransactions
   * TODO: create transaction type
   * TODO: this will need parameters
  */
  getTransactions(): object[] {
    return this.transactions;
  }

  mockSomeTransaction(): void {
    var today = new Date();

    for (let i = 0; i < 10; i++) {
      this.transactions.push({
        from: '0X09HS7GHFFIDXIANGIA...', // todo: full address
        to: '0F10HW40HFFIGXIACQIA...',
        status: (i % 2) ? 'sent' : 'received',
        amount: 1 + i * 10.25,
        date: new Date(today.getFullYear(), today.getUTCMonth(), today.getUTCDay() - i)
      })
    }
  }

  mockTransaction(amount: number, status: string): void {
    this.transactions.push({
      from: 'X09HS7GHFFIDXIANGIA...',
      to: WALLET_ADDRESS,
      status: status,
      amount: amount,
      date: new Date()
    })
  }

  /**
   * Send OCT.
   * @param  octAmount The amount, in OCT, to send
   * @param  toAddress The ERC20 address to send to
   * @return           A promise that resolves when/if sending was successful
   */
  sendOct(octAmount: number, toAddress: string) {

    return this.debitOrc(octAmount).then(() => {
      this.transactions.push({
        from: WALLET_ADDRESS,
        to: toAddress,
        status: status,
        amount: octAmount,
        date: new Date()
      })
    })

  }

  /**
  * Debits the specified amount from the user's wallet
  * TODO: mock function
  * @param  amount amount to debit
  * @return        A promise
  */
  debitOrc(amount: number): Promise<string> {
    if (amount > this.orcBalance) {
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
