import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Lesson } from '@/domain/event/enterprise/entities/lesson'
import { Slug } from '@/domain/event/enterprise/entities/value-objects/slug'
import { Lesson as PrismaLesson } from '@prisma/client'

export class PrismaLessonMapper {
  static toDomain(raw: PrismaLesson): Lesson {
    return Lesson.create(
      {
        content: raw.content,
        teacherId: new UniqueEntityId(raw.authorId),
        title: raw.title,
        createdAt: raw.createdAt,
        slug: Slug.create(raw.slug),
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }
}
