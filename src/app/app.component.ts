import {Component} from '@angular/core';
import {ModuleModel} from "./models/module.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Grading system';

  modules: ModuleModel[] = [
    new ModuleModel('#', 'person', 'User'),
    new ModuleModel('/home', 'home', 'Home'),
    new ModuleModel('/config', 'settings', 'Configuration')
  ];

}
