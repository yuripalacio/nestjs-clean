import { PaginationParams } from '@/core/repositories/pagination-params'
import { Lesson } from '../../enterprise/entities/lesson'

export abstract class LessonsRepository {
  abstract findById(id: string): Promise<Lesson | null>
  abstract findBySlug(slug: string): Promise<Lesson | null>
  abstract findManyRecent(params: PaginationParams): Promise<Lesson[]>
  abstract create(lesson: Lesson): Promise<void>
  abstract save(lesson: Lesson): Promise<void>
  abstract delete(lesson: Lesson): Promise<void>
}
