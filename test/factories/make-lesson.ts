import { faker } from '@faker-js/faker'
import { Lesson, LessonProps } from '@/domain/event/enterprise/entities/lesson'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export function makeLesson(
  override: Partial<LessonProps> = {},
  id?: UniqueEntityId,
) {
  const lesson = Lesson.create(
    {
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      teacherId: new UniqueEntityId(faker.string.uuid()),
      ...override,
    },
    id,
  )

  return lesson
}
