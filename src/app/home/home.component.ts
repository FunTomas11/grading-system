import { Component, OnInit } from '@angular/core';
import {GradesService} from "../services/grades.service";
import {GradeModel} from "../models/grade.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private service: GradesService) { }

  grades: GradeModel[] = [];

  ngOnInit(): void {
    this.service.getGrades().subscribe(data => {
      this.grades = data.slice(0).sort( (a, b) => {
        return a.minPercentage - b.minPercentage;
      });
    });
  }

}
