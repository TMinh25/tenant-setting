import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlxButtonModule } from '@fpt-is/flx-ui/button';
import { FlxFormModule } from '@fpt-is/flx-ui/form-basic';
import { FlxFileModule } from '@fpt-is/flx-ui/file';
import { FlxGridModule } from '@fpt-is/flx-ui/grid';
import { FlxRadioModule } from '@fpt-is/flx-ui/radio';
import { FlxBreadcrumbModule } from '@fpt-is/flx-ui/breadcrumb';
import { ColorPickerModule } from 'ngx-color-picker';
import { ThemeEditorComponent } from './editor/theme-editor.component';
import { TenantThemeEditorRoutingModule } from './theme-editor.routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlxFormModule,
    FlxRadioModule,
    FlxFileModule,
    FlxGridModule,
    FlxButtonModule,
    FlxBreadcrumbModule,
    ColorPickerModule,
    TenantThemeEditorRoutingModule,
  ],
  declarations: [ThemeEditorComponent],
  providers: [],
})
export class TenantThemeEditorModule {}
