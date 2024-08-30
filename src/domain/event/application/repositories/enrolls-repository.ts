import { PaginationParams } from '@/core/repositories/pagination-params'
import { Enroll } from '../../enterprise/entities/enroll'

export interface EnrollsRepository {
  findById(id: string): Promise<Enroll | null>
  findManyByLessonId(
    lessonId: string,
    params: PaginationParams,
  ): Promise<Enroll[]>
  create(enroll: Enroll): Promise<void>
  delete(enroll: Enroll): Promise<void>
}
