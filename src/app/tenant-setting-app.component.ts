import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  GroupNavigation,
  NavigationItem,
  NavigationService,
} from '@fpt-is/sdk-common/navigation';
import { TenantSettingService } from '@fpt-is/workflow-service';

@Component({
  selector: 'tenant-setting-app-root',
  templateUrl: './tenant-setting-app.component.html',
})
export class TenantSettingAppComponent implements AfterViewInit {
  constructor(
    private titleService: Title,
    private navigationService: NavigationService,
    private renderer: Renderer2
  ) {
    const title = 'Process Configuration';
    this.titleService.setTitle(title);
    this.navigationService.setTitle(title);
  }

  ngOnInit() {
    TenantSettingService.readGeneralSetting().subscribe((setting) => {
      document.documentElement.style.setProperty(
        '--dynamic-primary',
        setting.themeColor.primaryColor
      );
    });
  }

  settings: NavigationItem[] = [];

  groupNavigation: GroupNavigation[] = [];

  ngAfterViewInit(): void {
    this.groupNavigation = [
      {
        group: {
          code: 'DEFAULT_GROUP',
          label: 'Switch default menu',
        },
        items: [
          {
            id: '1',
            code: 'THEME_EDITOR',
            type: 'menu',
            icon: 'dashboard',
            path: ['tenant-setting', 'theme-editor'],
            label: 'Theme Editor',
            group: 'DEFAULT_GROUP',
          },
        ],
      },
    ];
    this.settingMenu();
  }

  settingMenu(): void {
    setTimeout(() => {
      this.navigationService.setNavigationGroup(this.groupNavigation);
    });
  }
}
