import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';



import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { ModalModule } from 'ngx-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SubjectComponent } from './views/subject/subject.component';
import { PartComponent } from './views/part/part.component';
import { UserComponent } from './views/user/user.component';
import { LabComponent } from './views/lab/lab.component';
import { StudentComponent } from './views/student/student.component';
import { DatatablesComponent } from './views/datatables/datatables.component';
import { TestsComponent } from './views/tests/tests.component';
import { FormsModule } from '@angular/forms';
import { ListquestionComponent } from './views/listquestion/listquestion.component';
import { GroupComponent } from './views/group/group.component';
import { TestTypeComponent } from './views/test-type/test-type.component';
import { SemesterComponent } from './views/semester/semester.component';
import { GrouptestComponent } from './views/grouptest/grouptest.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './app.interceptor';
import { PnotifyService } from './services/pnotify.service';
import { UsertypeComponent } from './views/usertype/usertype.component';
import { TakerComponent } from './views/taker/taker.component';
import { PrivilegeComponent } from './views/privilege/privilege.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    CKEditorModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    SubjectComponent,
    PartComponent,
    UserComponent,
    LabComponent,
    StudentComponent,
    DatatablesComponent,
    TestsComponent,
    ListquestionComponent,
    GroupComponent,
    TestTypeComponent,
    SemesterComponent,
    GrouptestComponent,
    UsertypeComponent,
    PrivilegeComponent,
    TakerComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    CookieService,
    PnotifyService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
