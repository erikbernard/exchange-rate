import {Component, inject, Input} from '@angular/core';
import {DailyExchangeRateData} from "../../models/ExchangeRate.model";
import {DailyExchangeItemComponent} from "../daily-exchange-item/daily-exchange-item.component";
import {CommonModule} from "@angular/common";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {MINUS, PLUS} from "../constants";
import { TOGGGLE } from '../animations';

@Component({
  selector: 'app-daily-exchange-list',
  standalone: true,
  imports: [CommonModule, DailyExchangeItemComponent],
  templateUrl: './daily-exchange-list.component.html',
  styleUrl: './daily-exchange-list.component.scss',
  animations: [TOGGGLE],
})
export class DailyExchangeListComponent {
  private readonly sanitizer = inject(DomSanitizer);

  @Input() history: DailyExchangeRateData[] = [];
  isOpen: boolean = true;
  // TODO: ajustar

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  getPreviousClose(index: number): number {
    if (index + 1 < this.history.length) {
      return this.history[index + 1].close;
    }
    return index;
  }

  get plusIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(PLUS)
  }
  get minusIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(MINUS)
  }
}
