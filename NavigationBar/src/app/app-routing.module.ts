import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { APP_BASE_HREF } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';



// const routes: Routes = [
//   { path: '**', component: EmptyRouteComponent,
//     path: 'login',    component: LoginComponent
//    },
// ];


const routes: Routes = [{
  path: '**', component: EmptyRouteComponent,
},
// {
//   path: 'login',
//   component: LoginComponent
// },
// {
//   path: 'profile',
//   component: ProfileComponent,
//   canActivate: [AuthGuard]
// }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppRoutingModule { }
