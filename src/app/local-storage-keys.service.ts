import { Injectable } from '@angular/core';

/**
 * Holds keys used in localStorage
 */
@Injectable()
export class LocalStorageKeysService {
  /**
   * Key for storing the two-letter language code
   */
  public static LANGUAGE = 'LANGUAGE';
}
