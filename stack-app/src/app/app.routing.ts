
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./component/dashboard/dashboard.component";

const MAINMENU_ROUTES: Routes = [
    //full : makes sure the path is absolute path
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent }
    
];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);