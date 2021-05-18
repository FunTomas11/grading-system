import {Component, Input, OnInit, Output, EventEmitter, OnChanges} from '@angular/core';
import {GradeModel} from "../../models/grade.model";
import {GradesService} from "../../services/grades.service";
import {FormBuilder, Validators} from "@angular/forms";
import {GradeModifyModel} from "../../models/gradeModify.model";
import {GradeCreatedModel} from "../../models/gradeCreated.model";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit, OnChanges {

  @Input() grade!: GradeModel;
  @Input() maxValue: number = 100;
  @Output() added = new EventEmitter<boolean>();
  gradeForm = this.fb.group({});


  constructor(private service: GradesService, private fb: FormBuilder, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }


  onSubmit() {
    const res = this.gradeForm.value;
    if (this.grade.id) {
      this.service.updateGrade(
        this.grade.id,
        new GradeModifyModel(res.minPercentage, res.symbolicGrade, res.descriptiveGrade)
      ).subscribe(data => {
        this.grade.symbolicGrade = data.symbolicGrade;
        this.grade.minPercentage = data.minPercentage;
        this.grade.descriptiveGrade = data.descriptiveGrade;
        this._snackBar.open("Updated successfully", "", { duration: 2000});
        },
        () => {
          this._snackBar.open("Something went wrong during updating!", "", { duration: 2000});
        });
    }
    else {
      this.service.addGrade(new GradeCreatedModel(res.minPercentage, res.symbolicGrade, res.descriptiveGrade)
      ).subscribe(data => {
        this.grade.id = data.id;
        this.grade.symbolicGrade = data.symbolicGrade;
        this.grade.minPercentage = data.minPercentage;
        this.grade.descriptiveGrade = data.descriptiveGrade;
        this._snackBar.open("Added successfully!", "", { duration: 2000});
        this.added.emit(true);
      },
        () => {
          this._snackBar.open("Something went wrong during adding!", "", { duration: 2000});
        });
    }
  }

  ngOnChanges(): void {
    this.gradeForm = this.fb.group({
      minPercentage: [(this.grade.id) ? this.grade.minPercentage : "", [Validators.pattern('^([1-9])?[0-9]$|^100$'), Validators.required, Validators.max(this.maxValue)]],
      symbolicGrade: [this.grade.symbolicGrade, Validators.required],
      descriptiveGrade: [this.grade.descriptiveGrade]
    });
  }
}
