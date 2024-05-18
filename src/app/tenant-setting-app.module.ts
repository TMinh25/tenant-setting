import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlxNavigationModule } from '@fpt-is/sdk-common/navigation';
import { FlxNotificationModule } from '@fpt-is/sdk-common/notification';
import { TenantSettingAppComponent } from './tenant-setting-app.component';
import { TenantSettingAppRoutingModule } from './tenant-setting-app.routing.module';

@NgModule({
  declarations: [TenantSettingAppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TenantSettingAppRoutingModule,
    FlxNotificationModule,
    FlxNavigationModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: (window as any).APP_ROUTE_PATH['@fpt-is/tenant-setting'],
    },
  ],
  bootstrap: [TenantSettingAppComponent],
})
export class TenantSettingAppModule {}
