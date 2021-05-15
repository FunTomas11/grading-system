export class GradeModel {
  constructor(
    public id: string,
    public minPercentage: number,
    public symbolicGrade: string,
    public descriptiveGrade?: string
  ) { }

}
