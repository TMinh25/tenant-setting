import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'theme-editor',
    pathMatch: 'full',
  },
  {
    path: 'theme-editor',
    loadChildren: () =>
      import('./theme-editor/theme-editor.module').then(
        (m) => m.TenantThemeEditorModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class TenantSettingAppRoutingModule {}
