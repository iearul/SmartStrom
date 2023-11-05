import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
// import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'calculator',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'calculator'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
