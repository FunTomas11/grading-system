import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GradeModel} from "../models/grade.model";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {GradeModifyModel} from "../models/gradeModify.model";
import {GradeCreatedModel} from "../models/gradeCreated.model";

@Injectable({
  providedIn: 'root'
})
export class GradesService {

  constructor(private http: HttpClient) { }

  addGrade(grade: GradeCreatedModel): Observable<GradeModel> {
    return this.http.post<GradeModel>(environment.url + "/grades", grade);
  }

  getGrades(): Observable<GradeModel[]> {
    return this.http.get<GradeModel[]>(environment.url + "/grades");
  }

  getGradeById(gradeId: string): Observable<GradeModel> {
    return this.http.get<GradeModel>(environment.url + "/grades/" + gradeId);
  }

  deleteGrade(gradeId: string): Observable<GradeModel> {
    return this.http.delete<GradeModel>(environment.url + "/grades/" + gradeId);
  }

  updateGrade(gradeId: string, grade: GradeModifyModel): Observable<GradeModel> {
    return this.http.patch<GradeModel>(environment.url + "/grades/" + gradeId, grade);
  }

}
