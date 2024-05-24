import { Component, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../environments/environment';
import { MODE_PROJECT } from './interface/main/main';
import { MainService } from './service/main/main.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  Mode: MODE_PROJECT = MODE_PROJECT.ONLINE;

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private mainService: MainService,
    private router: Router
  ) {
    this.translate.setDefaultLang('en');
    console.log('APP_CONFIG', APP_CONFIG);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  onToggleMode() {
    this.mainService.setMode(
      this.Mode === MODE_PROJECT.ONLINE
        ? MODE_PROJECT.OFFLINE
        : MODE_PROJECT.ONLINE
    );
    this.mainService.mode$.subscribe((mode) => {
      this.Mode = mode;
      window.require('electron').ipcRenderer.send('switchOffline', mode);
    });
    void this.router.navigate(['/login']);
  }

  protected readonly MODE_PROJECT = MODE_PROJECT;

  ngOnInit() {
    window.require('electron').ipcRenderer.send('put-path');
    window
      .require('electron')
      .ipcRenderer.on('setPath', (_event: never, value: string) => {
        localStorage.setItem('folderLocation', value);
      });
  }
}
