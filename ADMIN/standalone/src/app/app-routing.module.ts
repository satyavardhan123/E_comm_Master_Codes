import { Routes,} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ExternalApiComponent } from './pages/external-api/external-api.component';

import { authGuardFn } from '@auth0/auth0-angular';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { SellersComponent } from './pages/sellers/sellers.component';
import { BuyersComponent } from './pages/buyers/buyers.component';
import { OrdersComponent } from './pages/orders/orders.component';
import{OrderreceivedComponent} from './pages/orderreceived/orderreceived.component';
import { OrdershippedComponent } from './pages/ordershipped/ordershipped.component';
import { OrderdispatchedComponent } from './pages/orderdispatched/orderdispatched.component';

import { TicketComponent } from './pages/ticket/ticket.component';



export const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuardFn],
  },
  {path:'dashboard',component:DashboardComponent},
  {
    path: 'external-api',
    component: ExternalApiComponent,
    canActivate: [authGuardFn],
  },
  {path:'products',component:ProductsComponent, canActivate: [authGuardFn]},
  {path:'sellers',component:SellersComponent, canActivate: [authGuardFn]},
{path:'buyers',component:BuyersComponent, canActivate: [authGuardFn]},
{path:'orders',component:OrdersComponent, canActivate: [authGuardFn]},
{path:'orders/order-received',component:OrderreceivedComponent, canActivate: [authGuardFn]},
{path:'orders/order-shipped',component:OrdershippedComponent, canActivate: [authGuardFn]},
{path:'orders/order-dispatched',component:OrderdispatchedComponent, canActivate: [authGuardFn]},
{path:'orders/orders',component:OrdersComponent, canActivate: [authGuardFn]},
{path:'ticket',component:TicketComponent,canActivate: [authGuardFn]},

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
];
