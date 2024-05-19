import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BreadcrumbModel } from '@fpt-is/flx-ui/breadcrumb';
import { FlxFormComponent, MessageValidator } from '@fpt-is/flx-ui/form-basic';
import { Subject, map, of, takeUntil, tap } from 'rxjs';
import { customRequiredValidator } from 'src/app/validator.utils';
import {
  TenantSettingService,
  TenantGeneralSetting,
  FlattenTenantGeneralSetting,
  StorageService,
} from '@fpt-is/workflow-service';

const DEFAULT_COLORS = ['default', '#F79009', '#E72E6E', '#12B76A', '#00BDD6'];
const DEFAULT_TENANT_SETTING: FlattenTenantGeneralSetting = {
  primaryColor: 'default',
  headingBackground: 'default',
  leftMenuBackground: 'default',
  borderType: 'default',
  logoURL: '',
};
const DEFAULT_BORDER_TYPE_OPTIONS: {
  label: string;
  image: string;
  value: string;
}[] = [
  {
    label: 'Default',
    image: 'assets/icon/border-type-default.svg',
    value: 'default',
  },
  {
    label: 'Bordered',
    image: 'assets/icon/border-type-bordered.svg',
    value: 'bordered',
  },
];

@Component({
  selector: 'theme-editor',
  templateUrl: './theme-editor.component.html',
  styleUrls: ['./theme-editor.component.scss'],
})
export class ThemeEditorComponent implements OnChanges, OnInit, OnDestroy {
  @ViewChild('themeEditorForm') form!: FlxFormComponent;
  destroy$ = new Subject();
  ngOnInit(): void {
    this.colorSettingData = {
      primaryColor: [...DEFAULT_COLORS],
      headingBackground: [...DEFAULT_COLORS],
      leftMenuBackground: [...DEFAULT_COLORS],
    };
    this.initializeGeneralSetting();
  }

  initializeGeneralSetting(): void {
    TenantSettingService.readGeneralSetting()
      .pipe(
        map((setting: TenantGeneralSetting) => {
          this.tenantGeneralSetting = { ...setting, ...setting.themeColor };
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  customRequiredValidator = customRequiredValidator;

  breadcrumbs: BreadcrumbModel[] = [
    {
      title: 'Settings',
      icon: '/assets/icon/home.svg',
    },
    {
      title: 'Advanced',
    },
    {
      title: 'Theme Configuration',
    },
  ];

  VALIDATORS = {
    REQUIRED: {
      validator: this.customRequiredValidator(),
      msg: 'This field is required',
    },
  };

  tenantGeneralSetting: FlattenTenantGeneralSetting = DEFAULT_TENANT_SETTING;

  messageValidator: MessageValidator = {
    color: {
      required: this.VALIDATORS.REQUIRED.msg,
    },
  };

  colorSettingData: any = {
    primaryColor: [] as string[],
    headingBackground: [] as string[],
    leftMenuBackground: [] as string[],
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

  leftMenuBackgroundSettingDataSource = {
    optionValue: 'value',
    optionLabel: 'label',
    source: () =>
      of(this.colorSettingData.leftMenuBackground.map(this.optionMappingFunc)),
  };

  borderTypeDataSource: any = {
    optionValue: 'value',
    optionLabel: 'label',
    optionImage: 'image',
    source: () => of(DEFAULT_BORDER_TYPE_OPTIONS),
  };

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  handleColorChanged(field: string, data: any) {
    this.form.reactiveForm.patchValue({
      [field]: data,
    });
  }

  uploadAttachmentFile = (file: File) => {
    return StorageService.uploadFile(file).pipe(
      tap((logoURL: string) => this.form.reactiveForm.patchValue({ logoURL }))
    );
  };

  resetTheme() {
    this.form.reactiveForm.setValue(DEFAULT_TENANT_SETTING);
    console.log(this.tenantGeneralSetting);
  }

  previewTheme() {}

  saveTheme() {
    const flattenTenantGeneralSetting = this.tenantGeneralSetting;
    const tenantGeneralSetting: TenantGeneralSetting = {
      ...flattenTenantGeneralSetting,
      themeColor: {
        ...flattenTenantGeneralSetting,
      },
    };
    console.log(tenantGeneralSetting);
    document.documentElement.style.setProperty(
      '--dynamic-primary',
      flattenTenantGeneralSetting.primaryColor
    );
    TenantSettingService.upsertGeneralSetting(tenantGeneralSetting)
      .pipe(
        map(
          (setting: TenantGeneralSetting) =>
            (this.tenantGeneralSetting = { ...setting, ...setting.themeColor })
        )
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
