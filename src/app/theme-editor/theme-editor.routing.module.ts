import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeEditorComponent } from './editor/theme-editor.component';

const routes: Routes = [
  {
    path: '',
    component: ThemeEditorComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenantThemeEditorRoutingModule {}
