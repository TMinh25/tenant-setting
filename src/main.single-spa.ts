import { NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NavigationStart, Router } from '@angular/router';
import {
  getSingleSpaExtraProviders,
  singleSpaAngular,
} from 'single-spa-angular';
import { setPublicPath } from 'systemjs-webpack-interop';
import { TenantSettingAppModule } from './app/tenant-setting-app.module';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

setPublicPath('@fpt-is/tenant-setting');

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(
      TenantSettingAppModule
    );
  },
  template: '<tenant-setting-app-root />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
