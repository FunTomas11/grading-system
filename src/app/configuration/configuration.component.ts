import { Component, OnInit, ViewChild} from '@angular/core';
import {GradeModel} from "../models/grade.model";
import {GradesService} from "../services/grades.service";
import {MatSelectionList} from "@angular/material/list";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatSidenavContainer} from "@angular/material/sidenav";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  @ViewChild('gradeList') list!: MatSelectionList;
  @ViewChild('drawer') drawer!: MatSidenavContainer

  grades: GradeModel[] = [];
  added: boolean = true;
  selectedGrade: GradeModel | undefined;
  maxValue: number = 100;

  constructor(private service: GradesService, private _snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.service.getGrades().subscribe(data => {
      this.grades = data.sort((a, b) => {
        return a.minPercentage - b.minPercentage;
      });
    });
  }

  addGrade() {
    const temp = new GradeModel();
    if (JSON.stringify(temp) !== JSON.stringify(this.grades[this.grades.length - 1])) {
      this.maxValue = 100;
    }
    this.selectedGrade = temp;
  }

  deleteGrade(grade: GradeModel) {
    this.list.deselectAll();
    const index = this.grades.indexOf(grade, 0);
    this.grades.splice(index, 1);
    this.service.deleteGrade(grade.id).subscribe(
      () => this._snackbar.open("Deleted successfully", "", {duration: 2000}),
      () => this._snackbar.open("Something went wrong during deleting", "", {duration: 2000}));
  }

  onSelect(grade: GradeModel) {
    this.selectedGrade = grade;
    const index = this.grades.indexOf(grade, 0);
    this.maxValue = (index < this.grades.length - 1) ? this.grades[index + 1].minPercentage - 1 : 100;
  }

  changeState(event: boolean) {
    this.added = event;
    this.ngOnInit();
    this.drawer.close();
  }
}
