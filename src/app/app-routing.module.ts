import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NewAuthorComponent } from './new-author/new-author.component';

const routes: Routes = [
  {path:'',redirectTo:'main',pathMatch:'full'},
  {path:'main',component:MainPageComponent},
  {path:'new_author',component:NewAuthorComponent},
  {path:'details/:name',component:AuthorDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
