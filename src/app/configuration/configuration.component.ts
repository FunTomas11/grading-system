import {Component, OnInit} from '@angular/core';
import {GradeModel} from "../models/grade.model";
import {GradesService} from "../services/grades.service";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  grades: GradeModel[] = [];

  added: boolean = true;
  lastSelected: boolean = false;
  selectedGrade: GradeModel | undefined;

  // ========== Styles ================
  propsClass: string = "panel__blank";

  constructor(private service: GradesService) { }
  ngOnInit(): void {
    this.service.getGrades().subscribe( data => {
      this.grades = data.sort( (a, b) => {
        return a.minPercentage - b.minPercentage;
      });
    });
  }

  addGrade() {
      const temp = new GradeModel();
      if (JSON.stringify(temp) !== JSON.stringify(this.grades[this.grades.length - 1]) ) {
        this.grades.push(temp);
        this.added = false;
      }
      this.selectedGrade = temp;
      // this.selected = true;
      this.lastSelected = true;
      this.propsClass = "panel__props";
  }

  deleteGrade(grade: GradeModel) {
    // this.selected = false;
    this.selectedGrade = undefined;
    const index = this.grades.indexOf(grade, 0);
    this.grades.splice(index, 1);
    this.propsClass = "panel__blank";
    this.service.deleteGrade(grade.id).subscribe();
  }

  onSelect(grade: GradeModel) {
    // this.selected = true;
    this.selectedGrade = grade;
    this.propsClass = "panel__props";
  }

  changeState(event: boolean) {
    this.added = event;
  }

  selChange() {
    if (!this.added) {
      this.grades.pop();
      this.added = true;
      this.lastSelected = false;
    }
  }

}
