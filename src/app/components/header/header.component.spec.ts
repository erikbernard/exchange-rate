import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By, DomSanitizer } from '@angular/platform-browser';

const MOCK_LOGO_ACTION = '<svg>Mock Logo</svg>';
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must have a property as soon as it returns SafeHtml', () => {
    const logo = component.logo;
    expect(logo).toBeDefined();
    expect(typeof logo).toBe('object');
  });
  it('should render the SVG in the span element', () => {
    spyOnProperty(component, 'logo', 'get').and.returnValue(
      sanitizer.bypassSecurityTrustHtml(MOCK_LOGO_ACTION)
    );

    fixture.detectChanges();

    const logoElement = fixture.debugElement.query(By.css('.header__logo'));
    expect(logoElement).toBeTruthy();

    expect(logoElement.nativeElement.innerHTML).toContain('svg');
    expect(logoElement.nativeElement.innerHTML).toContain('Mock Logo');
  });

  it('should render the horizontal line (hr)', () => {
    fixture.detectChanges();

    const hrElement = fixture.debugElement.query(By.css('.header__line'));
    expect(hrElement).toBeTruthy();
    expect(hrElement.nativeElement.tagName).toBe('HR');
    expect(
      hrElement.nativeElement.classList.contains('header__line')
    ).toBeTrue();
  });

  it('must use DomSanitizer to bypassSecurityTrustHtml', () => {
    const bypassSpy = spyOn(sanitizer, 'bypassSecurityTrustHtml').and.callThrough();
    fixture.detectChanges();
    const logo = component.logo;

    expect(bypassSpy).toHaveBeenCalled();
    expect(logo).toBeDefined();
  });
});
