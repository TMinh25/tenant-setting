import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { TenantSettingAppModule } from './app/tenant-setting-app.module';

platformBrowserDynamic()
  .bootstrapModule(TenantSettingAppModule)
  .catch((err) => console.error(err));
