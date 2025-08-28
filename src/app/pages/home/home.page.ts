import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ExchangeRateService } from '../../services/exchange-rate.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CurrentExchangeComponent } from '../../components/current-exchange/current-exchange.component';
import { DailyExchangeListComponent } from '../../components/daily-exchange-list/daily-exchange-list.component';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-home.page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    CurrentExchangeComponent,
    DailyExchangeListComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  private readonly exchangeRateService = inject(ExchangeRateService);

  readonly currentRate$ = this.exchangeRateService.currentRate$;
  readonly dailyHistory$ = this.exchangeRateService.dailyHistory$;
  readonly error$ = this.exchangeRateService.error$;

  onSearch(rate: string): void {
    this.exchangeRateService.fetchExchangeData(rate);
    setTimeout(() => {
      this.exchangeRateService.clearError(false);
    }, 3000);
  }
}
