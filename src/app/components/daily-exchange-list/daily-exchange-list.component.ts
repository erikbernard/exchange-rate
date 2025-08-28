import { Component, inject, Input } from '@angular/core';
import { DailyExchangeRateData } from '../../models/ExchangeRate.model';
import { DailyExchangeItemComponent } from '../daily-exchange-item/daily-exchange-item.component';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PreviousClosePipe } from '../../pipes/previous-close.pipe';
import { MINUS, PLUS } from '../constants';
import { TOGGGLE } from '../animations';

@Component({
  selector: 'app-daily-exchange-list',
  standalone: true,
  imports: [CommonModule, DailyExchangeItemComponent, PreviousClosePipe],
  templateUrl: './daily-exchange-list.component.html',
  styleUrl: './daily-exchange-list.component.scss',
  animations: [TOGGGLE],
})
export class DailyExchangeListComponent {
  private readonly sanitizer = inject(DomSanitizer);

  @Input() history: DailyExchangeRateData[] = [];
  isOpen: boolean = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  get plusIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(PLUS);
  }
  get minusIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(MINUS);
  }
}
