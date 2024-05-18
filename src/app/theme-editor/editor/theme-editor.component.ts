import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BreadcrumbModel } from '@fpt-is/flx-ui/breadcrumb';
import { FlxFormComponent, MessageValidator } from '@fpt-is/flx-ui/form-basic';
import { of } from 'rxjs';
import { customRequiredValidator } from 'src/app/validator.utils';

const DEFAULT_COLORS = [
  'default',
  '#F79009',
  '#E72E6E',
  '#12B76A',
  '#00BDD6',
  'colorPicker',
];

@Component({
  selector: 'theme-editor',
  templateUrl: './theme-editor.component.html',
  styleUrls: ['./theme-editor.component.scss'],
})
export class ThemeEditorComponent implements OnChanges, OnInit {
  @ViewChild('themeEditorForm') form!: FlxFormComponent;
  ngOnInit(): void {
    this.colorSettingData = {
      primaryColor: [...DEFAULT_COLORS],
      headingBackground: [...DEFAULT_COLORS],
      leftmenuBackground: [...DEFAULT_COLORS],
    };
  }

  customRequiredValidator = customRequiredValidator;

  breadcrumbs: BreadcrumbModel[] = [
    {
      title: 'Settings',
      icon: '/assets/icon/home.svg',
    },
    {
      title: 'Workflow',
    },
    {
      title: 'Process',
    },
  ];

  VALIDATORS = {
    REQUIRED: {
      validator: this.customRequiredValidator(),
      msg: 'This field is required',
    },
  };

  messageValidator: MessageValidator = {
    primaryColor: {
      required: this.VALIDATORS.REQUIRED.msg,
    },
  };

  colorSettingData: any = {
    primaryColor: [] as string[],
    headingBackground: [] as string[],
    leftmenuBackground: [] as string[],
  };

  public primaryColorToggle: boolean = false;
  public headingBackgroundToggle: boolean = false;
  public leftmenuBackgroundToggle: boolean = false;

  tenantThemeSettingData: any = {
    primaryColor: 'default',
    headingBackground: 'default',
    leftmenuBackground: 'default',
  };

  optionMappingFunc(color: string) {
    return { label: color, value: color };
  }

  primaryColorSettingDataSource = {
    optionValue: 'value',
    optionLabel: 'label',
    source: () =>
      of(this.colorSettingData.primaryColor.map(this.optionMappingFunc)),
  };

  headingBackgroundSettingDataSource = {
    optionValue: 'value',
    optionLabel: 'label',
    source: () =>
      of(this.colorSettingData.headingBackground.map(this.optionMappingFunc)),
  };

  leftmenuBackgroundSettingDataSource = {
    optionValue: 'value',
    optionLabel: 'label',
    source: () =>
      of(this.colorSettingData.leftmenuBackground.map(this.optionMappingFunc)),
  };

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  handleColorChanged(field: string, data: any) {
    this.form.reactiveForm.patchValue({
      [field]: data,
    });

    if (Array.isArray(this.colorSettingData[field])) {
      this.colorSettingData[field].pop();
      this.colorSettingData[field].push(data);
    } else {
      this.colorSettingData[field] = [data];
    }

    // switch (field) {
    //   case 'primaryColor':
    //     this.primaryColorSettingDataSource.source = () =>
    //       of(this.colorSettingData.primaryColor.map(this.optionMappingFunc));
    //     break;
    //   case 'headingBackground':
    //     this.headingBackgroundSettingDataSource.source = () =>
    //       of(
    //         this.colorSettingData.headingBackground.map(this.optionMappingFunc)
    //       );
    //     break;
    //   case 'leftmenuBackground':
    //     this.leftmenuBackgroundSettingDataSource.source = () =>
    //       of(
    //         this.colorSettingData.leftmenuBackground.map(this.optionMappingFunc)
    //       );
    //     break;

    //   default:
    //     break;
    // }
  }

  resetTheme() {

  }
  previewTheme() {}

  saveTheme()
}
