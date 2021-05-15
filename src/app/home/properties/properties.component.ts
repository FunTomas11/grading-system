import {Component, Input, OnInit} from '@angular/core';
import {GradeModel} from "../../models/grade.model";


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  @Input() grade!: GradeModel;

  constructor() { }

  ngOnInit(): void {
  }

}
