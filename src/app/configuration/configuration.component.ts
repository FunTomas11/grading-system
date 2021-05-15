import {Component, OnInit} from '@angular/core';
import {GradeModel} from "../models/grade.model";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  blankGrade: GradeModel = new GradeModel("", 0, "", "");
  grades: GradeModel[] = [
    new GradeModel("bd66802e-4242-43e1-ab9f-a2ab980a882c", 0, "F", ""),
    new GradeModel("207f2489-60aa-40b3-a201-6debef2e8a35", 31, "E", ""),
    new GradeModel("e29d1034-4356-4e63-b018-7e7f87357efa", 50, "D", ""),
    new GradeModel("3c38913d-4b0f-4e4e-a731-a8611ed5ee18", 73, "C", ""),
    new GradeModel("6cf7be2b-45fd-49de-81b2-27cc0c6de34d", 90, "B", ""),
    new GradeModel("cb82fbe7-5069-4e3b-9024-aa616f8e47ae", 100, "A", "Great Job")
  ];



  selected: boolean = false;
  selectedGrade: GradeModel = this.blankGrade;
  selectedOption: any;

  // ========== Styles ================
  propsClass: string = "panel__blank";

  constructor() { }
  ngOnInit(): void { }

  addGrade() {
    this.grades.push(new GradeModel("", 0, "", ""));
    this.selectedGrade = this.grades[this.grades.length - 1];
    this.selected = true;
  }

  deleteGrade(grade: GradeModel) {
    this.selected = false;
    const index = this.grades.indexOf(grade, 0);
    if (index > -1) {
      this.grades.splice(index, 1);
    }
    this.propsClass = "panel__blank";
  }

  sortArray(){
    this.grades.sort( (a, b) => a.minPercentage - b.minPercentage);
  }

  onSelect(grade: GradeModel) {
    this.selected = true;
    this.selectedGrade = grade;
    this.propsClass = "panel__props";
  }
}
