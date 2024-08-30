import { Lesson as PrismaLesson, Prisma } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Lesson } from '@/domain/event/enterprise/entities/lesson'
import { Slug } from '@/domain/event/enterprise/entities/value-objects/slug'

export class PrismaLessonMapper {
  static toDomain(raw: PrismaLesson): Lesson {
    return Lesson.create(
      {
        content: raw.content,
        teacherId: new UniqueEntityId(raw.teacherId),
        title: raw.title,
        createdAt: raw.createdAt,
        slug: Slug.create(raw.slug),
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(lesson: Lesson): Prisma.LessonUncheckedCreateInput {
    return {
      id: lesson.id.toString(),
      teacherId: lesson.teacherId.toString(),
      content: lesson.content,
      title: lesson.title,
      slug: lesson.slug.value,
      createdAt: lesson.createdAt,
      updatedAt: lesson.updatedAt,
    }
  }
}
