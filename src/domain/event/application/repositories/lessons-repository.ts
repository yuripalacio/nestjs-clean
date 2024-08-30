import { PaginationParams } from '@/core/repositories/pagination-params'
import { Lesson } from '../../enterprise/entities/lesson'

export interface LessonsRepository {
  findById(id: string): Promise<Lesson | null>
  findBySlug(slug: string): Promise<Lesson | null>
  findManyRecent(params: PaginationParams): Promise<Lesson[]>
  create(lesson: Lesson): Promise<void>
  save(lesson: Lesson): Promise<Lesson>
  delete(lesson: Lesson): Promise<void>
}
