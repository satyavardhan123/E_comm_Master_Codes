import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderreceivedComponent } from './orderreceived.component';

describe('OrderreceivedComponent', () => {
  let component: OrderreceivedComponent;
  let fixture: ComponentFixture<OrderreceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderreceivedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderreceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
