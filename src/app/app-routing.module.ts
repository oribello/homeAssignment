import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MonitorComponent } from './components/monitor/monitor.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'monitor', component: MonitorComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/main' } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
