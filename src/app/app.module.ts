import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { MainPageComponent } from './main-page/main-page.component';
import { NewAuthorComponent } from './new-author/new-author.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AddbookComponent } from './addbook/addbook.component';
import { EditbookComponent } from './editbook/editbook.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NewAuthorComponent,
    AuthorDetailsComponent,
    AddbookComponent,
    EditbookComponent,
    EditAuthorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
