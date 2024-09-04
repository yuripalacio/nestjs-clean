import { PaginationParams } from '@/core/repositories/pagination-params'
import { LessonAttachmentsRepository } from '@/domain/event/application/repositories/lesson-attachments-repository'
import { LessonsRepository } from '@/domain/event/application/repositories/lessons-repository'
import { Lesson } from '@/domain/event/enterprise/entities/lesson'

export class InMemoryLessonsRepository implements LessonsRepository {
  public items: Lesson[] = []

  constructor(
    private lessonAttachmentsRepository: LessonAttachmentsRepository,
  ) {}

  async findById(id: string): Promise<Lesson | null> {
    const lesson = this.items.find((item) => item.id.toString() === id)

    if (!lesson) {
      return null
    }

    return lesson
  }

  async findBySlug(slug: string): Promise<Lesson | null> {
    const lesson = this.items.find((item) => item.slug.value === slug)

    if (!lesson) {
      return null
    }

    return lesson
  }

  async findManyRecent({ page }: PaginationParams): Promise<Lesson[]> {
    const lessons = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return lessons
  }

  async save(lesson: Lesson): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === lesson.id)

    this.items[itemIndex] = lesson
  }

  async create(lesson: Lesson): Promise<void> {
    this.items.push(lesson)
  }

  async delete(lesson: Lesson): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === lesson.id)

    this.items.splice(itemIndex, 1)

    this.lessonAttachmentsRepository.deleteManyByLessonId(lesson.id.toString())
  }
}
