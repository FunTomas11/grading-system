import {Component, Input, OnInit, Output, EventEmitter, OnChanges} from '@angular/core';
import {GradeModel} from "../../models/grade.model";
import {GradesService} from "../../services/grades.service";
import {FormBuilder, Validators} from "@angular/forms";
import {GradeModifyModel} from "../../models/gradeModify.model";
import {GradeCreatedModel} from "../../models/gradeCreated.model";


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


  constructor(private service: GradesService, private fb: FormBuilder) {
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
      });
    }
    else {
      this.service.addGrade(new GradeCreatedModel(res.minPercentage, res.symbolicGrade, res.descriptiveGrade)
      ).subscribe(data => {
        this.grade.id = data.id;
        this.grade.symbolicGrade = data.symbolicGrade;
        this.grade.minPercentage = data.minPercentage;
        this.grade.descriptiveGrade = data.descriptiveGrade;

        this.added.emit(true);
      });
    }
  }

  ngOnChanges(): void {
    this.gradeForm = this.fb.group({
      minPercentage: [(this.grade.id) ? this.grade.minPercentage : "", [Validators.pattern('^([1-9])?[0-9]$|^100$'), Validators.required]],
      symbolicGrade: [this.grade.symbolicGrade, Validators.required],
      descriptiveGrade: [this.grade.descriptiveGrade]
    });
  }
}
