import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {GradeModel} from "../models/grade.model";
import {GradesService} from "../services/grades.service";
import {MatSelectionList} from "@angular/material/list";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, OnChanges {


  @ViewChild('gradeList') list!: MatSelectionList;

  grades: GradeModel[] = [];
  added: boolean = true;
  selectedGrade: GradeModel | undefined;

  // ========== Styles ================
  propsClass: string = "panel__blank";
  maxValue: number = 100;

  constructor(private service: GradesService) {
  }

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
      this.grades.push(temp);
      this.added = false;
      this.maxValue = 100;

      this.selectLast();
    }
    this.selectedGrade = temp;
    this.propsClass = "panel__props";

  }

  deleteGrade(grade: GradeModel) {
    if (this.selectedGrade === grade) {
      this.list.deselectAll();
      this.selectedGrade = undefined;
      this.propsClass = "panel__blank";

    }
    const index = this.grades.indexOf(grade, 0);
    this.grades.splice(index, 1);
    if (this.added) this.service.deleteGrade(grade.id).subscribe();

  }

  onSelect(grade: GradeModel) {
    this.selectedGrade = grade;
    this.propsClass = "panel__props";

    const index = this.grades.indexOf(grade, 0);
    this.maxValue = (index < this.grades.length - 1 && this.added) ? this.grades[index + 1].minPercentage - 1 : 100;
  }

  changeState(event: boolean) {
    this.added = event;
    this.ngOnInit();
  }

  selChange() {
    if (!this.added) {
      this.grades.pop();
      this.added = true;
    }
  }

  selectLast() {

    this.list.options.changes.pipe(take(1)).subscribe(data => {
      let last = this.list.options.last;
      last = data.last;
      this.list.selectedOptions.select(last);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes");
  }


}
