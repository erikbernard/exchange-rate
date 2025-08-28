import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the error message and the "invalid" class by default', () => {
    const errorSpan = fixture.debugElement.query(By.css('.form-error'));
    const fieldset = fixture.debugElement.query(By.css('.form-field'));
    const textContent = 'check if the currency code is valid and try again!';

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.nativeElement.textContent.trim()).toBe(textContent);
    expect(fieldset.classes['invalid']).toBe(true);
  });

  it('should not display the error message and the "invalid" class when [invalid]="false"', () => {
    component.invalid = false;
    fixture.detectChanges();

    const errorSpan = fixture.debugElement.query(By.css('.form-error'));
    const fieldset = fixture.debugElement.query(By.css('.form-field'));

    expect(errorSpan).toBeFalsy();
    expect(fieldset.classes['invalid']).toBeFalsy();
  });

  it('should update the input value when the "search" property is changed', async () => {
    const testValue = 'USD';
    component.search = testValue;

    fixture.detectChanges();
    await fixture.whenStable();

    const inputElement = fixture.debugElement.query(By.css('.form-field__input'));
    expect(inputElement.nativeElement.value).toBe(testValue);
  });

  it('should emit the value of "search" when the button is clicked', () => {
    spyOn(component.onSearch, 'emit');

    const testValue = 'BRL';
    component.search = testValue;
    fixture.detectChanges();

    const searchButton = fixture.debugElement.query(By.css('.button-search'));
    searchButton.nativeElement.click();

    expect(component.onSearch.emit).toHaveBeenCalled();
    expect(component.onSearch.emit).toHaveBeenCalledWith(testValue);
  });
});
