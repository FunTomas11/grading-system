import { Component } from '@angular/core';
import {ModuleModel} from "./models/module.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Grading system';

  modules: ModuleModel[] = [
    new ModuleModel('/home', 'home'),
    new ModuleModel('/config', 'settings')
  ];
}
