import { Component, Input } from '@angular/core';
import { CurrentExchangeRate } from '../../models/ExchangeRate.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-current-exchange',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-exchange.component.html',
  styleUrl: './current-exchange.component.scss',
})
export class CurrentExchangeComponent {
  @Input() rate: CurrentExchangeRate | null = null;
}
