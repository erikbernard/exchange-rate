import {Component, inject} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {LOGO_ACTION} from "../constants";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly sanitizer = inject(DomSanitizer);
  get logo(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(LOGO_ACTION)
  }
}
