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

function objectFlatter(obj: any) {
  const result: any = {};

  function recurse(currentObj: any) {
    for (let key in currentObj) {
      if (currentObj.hasOwnProperty(key)) {
        if (
          typeof currentObj[key] === 'object' &&
          currentObj[key] !== null &&
          !Array.isArray(currentObj[key])
        ) {
          recurse(currentObj[key]);
        } else {
          result[key] = currentObj[key];
        }
      }
    }
  }

  recurse(obj);
  return result;
}

function buildGeneralSetting(flattenSetting: FlattenTenantGeneralSetting) {
  const { logoURL, borderType, primary, heading, menu } = flattenSetting;
  return {
    asset: {
      logoURL,
    },
    theme: {
      borderType,
      color: {
        primary,
        background: {
          heading,
          menu,
        },
      },
    },
  } as TenantGeneralSetting;
}

const DEFAULT_COLORS = ['null', '#F79009', '#E72E6E', '#12B76A', '#00BDD6'];
const DEFAULT_TENANT_SETTING: FlattenTenantGeneralSetting = {
  primary: 'null',
  heading: 'null',
  menu: 'null',
  borderType: 'DEFAULT',
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
    value: 'DEFAULT',
  },
  {
    label: 'Bordered',
    image: 'assets/icon/border-type-bordered.svg',
    value: 'BORDERED',
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
      menuBackground: [...DEFAULT_COLORS],
    };
    this.initializeGeneralSetting();
  }

  initializeGeneralSetting(): void {
    TenantSettingService.readGeneralSetting()
      .pipe(
        map((setting: TenantGeneralSetting) => {
          this.tenantGeneralSetting = objectFlatter(setting);
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
    menuBackground: [] as string[],
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

  menuBackgroundSettingDataSource = {
    optionValue: 'value',
    optionLabel: 'label',
    source: () =>
      of(this.colorSettingData.menuBackground.map(this.optionMappingFunc)),
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
    const flattenSetting = this.tenantGeneralSetting;
    const tenantGeneralSetting: TenantGeneralSetting =
      buildGeneralSetting(flattenSetting);
    TenantSettingService.upsertGeneralSetting(tenantGeneralSetting)
      .pipe(
        map(
          (setting: TenantGeneralSetting) =>
            (this.tenantGeneralSetting = objectFlatter(setting))
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        location.reload();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
