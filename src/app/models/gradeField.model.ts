import {GradeModel} from "./grade.model";

export class GradeFieldModel {
  constructor(
    public grade: GradeModel,
    public maxPercentage: string,
  ) {
  }

}
