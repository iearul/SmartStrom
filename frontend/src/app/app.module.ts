import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CardModule } from 'primeng/card';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        ProductComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ToolbarModule,
        ConfirmDialogModule,
        RatingModule,
        InputNumberModule,
        InputTextareaModule,
        RadioButtonModule,
        DropdownModule,
        ToastModule,
        ButtonModule,
        CardModule,
        TagModule,
        DividerModule
    ],
    providers: [ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule { }
