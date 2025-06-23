import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { IntComponent } from './int/int.component';
import { HomeComponent } from './home/home.component';   
import { routes } from './app.routes'; 
import { GenerateComponent } from './generate/generate.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes) 
  ],
})
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IntComponent,
    HomeComponent,
    GenerateComponent,
  ],
   imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }