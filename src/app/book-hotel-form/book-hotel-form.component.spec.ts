import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookHotelFormComponent } from './book-hotel-form.component';

describe('BookHotelFormComponent', () => {
  let component: BookHotelFormComponent;
  let fixture: ComponentFixture<BookHotelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookHotelFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookHotelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
