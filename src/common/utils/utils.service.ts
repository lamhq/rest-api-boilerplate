import { Injectable } from '@nestjs/common';

/**
 * A utility service that provides various helpful methods.
 */
@Injectable()
export class UtilsService {
  /**
   * Formats a number as a string using the en-US locale.
   * @param n The number to format.
   * @returns The formatted number string.
   */
  formatNumber(n: number): string {
    return new Intl.NumberFormat('en-US').format(n);
  }
}
