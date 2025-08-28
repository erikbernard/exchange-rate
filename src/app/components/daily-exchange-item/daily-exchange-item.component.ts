import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { DailyExchangeRateData } from '../../models/ExchangeRate.model';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ARROW_DOWN, ARROW_UP } from '../constants';
import { CalculateDiffPipe } from '../../pipes/calculate-diff.pipe';

@Component({
  selector: 'app-daily-exchange-item',
  standalone: true,
  imports: [CommonModule, CalculateDiffPipe],
  templateUrl: './daily-exchange-item.component.html',
  styleUrl: './daily-exchange-item.component.scss',
})
export class DailyExchangeItemComponent {
  private readonly sanitizer = inject(DomSanitizer);

  @Input() item!: DailyExchangeRateData;
  @Input() previousClose: number = 0;

  get arrowUp(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(ARROW_UP);
  }

  get arrowDown(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(ARROW_DOWN);
  }
}
