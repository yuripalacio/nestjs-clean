import { Lesson } from '@/domain/event/enterprise/entities/lesson'

export class LessonPresenter {
  static toHTTP(lesson: Lesson) {
    return {
      id: lesson.id.toString(),
      title: lesson.title,
      slug: lesson.slug.value,
      createdAt: lesson.createdAt,
      updatedAt: lesson.updatedAt,
    }
  }
}
