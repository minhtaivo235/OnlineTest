import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { SubjectComponent } from './views/subject/subject.component';
import { PartComponent } from './views/part/part.component';
import { LabComponent } from './views/lab/lab.component';
import { UserComponent } from './views/user/user.component';
import { StudentComponent } from './views/student/student.component';
import { DatatablesComponent } from './views/datatables/datatables.component';
import { TestsComponent } from './views/tests/tests.component';
import { ListquestionComponent } from './views/listquestion/listquestion.component';
import { GroupComponent } from './views/group/group.component';
import { TestTypeComponent } from './views/test-type/test-type.component';
import { PrivilegeComponent } from './views/privilege/privilege.component';
import { SemesterComponent } from './views/semester/semester.component';
import { GrouptestComponent } from './views/grouptest/grouptest.component';
import { UsertypeComponent } from './views/usertype/usertype.component';
import { TakerComponent } from './views/taker/taker.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'part',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'part',
        component: PartComponent
      },
      {
        path: 'semester',
        component: SemesterComponent,
        data: {
          title: 'Semester'
        },
      },
      {
        path: 'taker',
        component: TakerComponent,
        data: {
          title: 'Thí Sinh'
        }
      },
      {
        path: 'usertype',
        component: UsertypeComponent,
        data: {
          title: 'User Type'
        },
      },
      {
        path: 'grouptest',
        component: GrouptestComponent,
        data: {
          title: 'Grouptest'
        },
      },
      {
        path: 'test',
        component: TestsComponent,
        data: {
          title: 'Tests'
        },
      },
      {
        path: 'test_type',
        component: TestTypeComponent,
        data: {
          title: 'Test_type'
        },
      },
      {
        path: 'datatable',
        component: DatatablesComponent
      },
      {
        path: 'button',
        component: StudentComponent,
        data: {
          title: 'button'
        },
      },
      {
        path: 'subject',
        component: SubjectComponent,
        data: {
          title: 'Subject'
        },
      },
      {
        path: 'user',
        component: UserComponent,
        data: {
          title: 'User'
        },
      },
      {
        path:'privilege',
        component: PrivilegeComponent,
        data: {
          title: 'Privilege'
        }
      },
      {
        path: 'group',
        component: GroupComponent,
        data: {
          title: 'Group'
        },
      },
      {
        path: 'lab',
        component: LabComponent,
        data: {
          title: 'Lab'
        },
      },
      {
        path: 'listquestion',
        component: ListquestionComponent
      },
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
