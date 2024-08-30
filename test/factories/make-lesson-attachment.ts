import { faker } from '@faker-js/faker'
import {
  LessonAttachment,
  LessonAttachmentProps,
} from '@/domain/event/enterprise/entities/lesson-attachment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export function makeLessonAttachment(
  override: Partial<LessonAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const lesson = LessonAttachment.create(
    {
      attachmentId: new UniqueEntityId(faker.string.uuid()),
      lessonId: new UniqueEntityId(faker.string.uuid()),
      ...override,
    },
    id,
  )

  return lesson
}
