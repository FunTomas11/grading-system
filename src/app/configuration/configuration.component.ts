import {Component, OnInit, ViewChild} from '@angular/core';
import {GradeModel} from "../models/grade.model";
import {GradesService} from "../services/grades.service";
import {MatSelectionList} from "@angular/material/list";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {


  @ViewChild('gradeList') list!: MatSelectionList;

  grades: GradeModel[] = [];
  added: boolean = true;
  selectedGrade: GradeModel | undefined;

  // ========== Styles ================
  propsClass: string = "panel__blank";
  maxValue: number = 100;

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
    // this.selectLast();

  }

  onSelect(grade: GradeModel, next: number) {
    this.selectedGrade = grade;
    this.propsClass = "panel__props";

    this.maxValue = (next) ? next : 99;
  }

  changeState(event: boolean) {
    this.added = event;
  }

  selChange() {
    console.log(this.list);
    if (!this.added) {
      this.grades.pop();
      this.added = true;
    }
  }

  selectLast() {
    let last = this.list.options.last;
    this.list.options.changes.subscribe( data => {
      this.list.deselectAll();
      last = data.last;

    });

    this.list.selectedOptions.select(last);
  }


}
