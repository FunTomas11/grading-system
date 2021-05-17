export class GradeModel {
  constructor(
    public id: string = "",
    public minPercentage: number = 0,
    public symbolicGrade: string = "",
    public descriptiveGrade?: string
  ) { }
}
