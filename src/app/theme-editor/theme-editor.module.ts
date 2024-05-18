import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlxButtonModule } from '@fpt-is/flx-ui/button';
import { FlxFormModule } from '@fpt-is/flx-ui/form-basic';
import { FlxRadioModule } from '@fpt-is/flx-ui/radio';
import { FlxBreadcrumbModule } from '@fpt-is/flx-ui/breadcrumb';
import { ColorPickerModule } from 'ngx-color-picker';
import { ThemeEditorComponent } from './editor/theme-editor.component';
import { TenantThemeEditorRoutingModule } from './theme-editor.routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlxRadioModule,
    FlxButtonModule,
    FlxBreadcrumbModule,
    FlxFormModule,
    ColorPickerModule,
    TenantThemeEditorRoutingModule,
  ],
  declarations: [ThemeEditorComponent],
  providers: [],
})
export class TenantThemeEditorModule {}
