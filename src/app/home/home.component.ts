import { Component, OnInit } from '@angular/core';
import {Grade} from "../models/grade";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  grades: Grade[] = [
    new Grade("bd66802e-4242-43e1-ab9f-a2ab980a882c", 0, "F", ""),
    new Grade("207f2489-60aa-40b3-a201-6debef2e8a35", 31, "E", ""),
    new Grade("e29d1034-4356-4e63-b018-7e7f87357efa", 50, "D", ""),
    new Grade("3c38913d-4b0f-4e4e-a731-a8611ed5ee18", 73, "C", ""),
    new Grade("6cf7be2b-45fd-49de-81b2-27cc0c6de34d", 90, "B", ""),
    new Grade("cb82fbe7-5069-4e3b-9024-aa616f8e47ae", 100, "A", "Great Job")
  ];


  constructor() { }

  ngOnInit(): void {
  }

  AddGrade(grade?: Grade) {
    // this.grades.push(grade);
  }

  DeleteGrade(grade: Grade) {
    const index = this.grades.indexOf(grade, 0);
    if (index > -1) {
      this.grades.splice(index, 1);
    }
  }
}
