export class GradeCreatedModel {
  constructor(
    public minPercentage: number,
    public symbolicGrade: string,
    public descriptiveGrade?: string
  ) {
  }
}
