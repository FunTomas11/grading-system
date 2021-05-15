import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from "./configuration/configuration.component";

const routes: Routes = [
  { path: '', redirectTo: '/config', pathMatch: 'full'},
  { path: 'config', component: ConfigurationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
