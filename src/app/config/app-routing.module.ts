import { SignupComponent } from './../pages/access/signup/signup.component';
import { SigninComponent } from './../pages/access/signin/signin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/layout/home/home.component';

const routes: Routes = [

    {
        path: '', component: HomeComponent,
        children: [
            { path: 'registers/signup', component: SignupComponent},
            {
                path: 'gip',
                loadChildren: '../pages/system/system.module#SystemModule'
                // canActivate: [AuthGuard]
            },
        ]
    },
    {
        path: 'blog',
        loadChildren: '../pages/blog/blog.module#BlogModule'
    },
    { path: 'login', component: SigninComponent },
    { path: 'signup', component: SignupComponent},
    { path: '**', component: SigninComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
