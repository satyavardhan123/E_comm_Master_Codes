import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdershippedComponent } from './ordershipped.component';

describe('OrdershippedComponent', () => {
  let component: OrdershippedComponent;
  let fixture: ComponentFixture<OrdershippedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdershippedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdershippedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
