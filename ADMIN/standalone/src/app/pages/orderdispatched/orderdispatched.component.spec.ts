import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderdispatchedComponent } from './orderdispatched.component';

describe('OrderdispatchedComponent', () => {
  let component: OrderdispatchedComponent;
  let fixture: ComponentFixture<OrderdispatchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderdispatchedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderdispatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
