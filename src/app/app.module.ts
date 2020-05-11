import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DashbordComponent} from './view/dashbord/dashbord.component';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatAutocompleteModule, MatListModule, MatPaginatorModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {ToolInComponent} from './view/tool-in/tool-in.component';
import {ToolOutComponent} from './view/tool-out/tool-out.component';
import {ToolAvailableComponent} from './view/tool-available/tool-available.component';
import {ToolHistoryComponent} from './view/tool-history/tool-history.component';
import {ToolAddComponent} from './view/tool-add/tool-add.component';
import {ToolTransactionComponent} from './view/tool-transaction/tool-transaction.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './routing/app-routing-module';
import { MainComponent } from './view/main/main.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { ToolComponent } from './view/tool/tool.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as Material from '@angular/material';
import {DatePipe} from '@angular/common';
import { LoginComponent } from './view/login/login.component';
import {AuthService} from './service/auth.service';
import {ReservationService} from './service/reservation.service';
import {CategoryService} from './service/category.service';
import {DepatmentService} from './service/depatment.service';
import {TechnicianService} from './service/technician.service';
import {ToolService} from './service/tool.service';
import {JwtInterceptor} from './helpers/JwtInterceptor';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {AddUserComponent} from './view/add-user/add-user.component';
import { CategoryComponent } from './view/category/category.component';
import { DepatmentComponent } from './view/depatment/depatment.component';
import { SettingsComponent } from './view/settings/settings.component';
import {TechnicianComponent} from './view/technician/technician.component';
import { ItemComponent } from './view/item/item.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {BarecodeScannerLivestreamModule} from 'ngx-barcode-scanner';
import { AdminComponent } from './view/admin/admin-dashboard/admin.component';
import { AdminMainComponent } from './view/admin/admin-main/admin-main.component';
import { AdminTechnicianComponent } from './view/admin/admin-technician/admin-technician.component';
import { AdminItemComponent } from './view/admin/admin-item/admin-item.component';
import { AdminDepatmentComponent } from './view/admin/admin-depatment/admin-depatment.component';
import { AdminTransactionComponent } from './view/admin/admin-transaction/admin-transaction.component';


@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    ToolInComponent,
    ToolOutComponent,
    ToolAvailableComponent,
    ToolHistoryComponent,
    ToolAddComponent,
    ToolTransactionComponent,
    MainComponent,
    ToolComponent,
    LoginComponent,
    TechnicianComponent,
    AddUserComponent,
    CategoryComponent,
    DepatmentComponent,
    SettingsComponent,
    ItemComponent,
    AdminComponent,
    AdminMainComponent,
    AdminTechnicianComponent,
    AdminItemComponent,
    AdminDepatmentComponent,
    AdminTransactionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    RouterModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule,
    MatDialogModule,
    Material.MatDatepickerModule,
    Material.MatIconModule,
    Material.MatNativeDateModule,
    NgxMatSelectSearchModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatCheckboxModule,
    BarecodeScannerLivestreamModule,
  ],
  providers: [
    DatePipe,
    AuthService,
    ReservationService,
    CategoryService,
    DepatmentService,
    TechnicianService,
    ToolService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
