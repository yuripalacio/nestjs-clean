import { Attachment as PrismaAttachment } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { LessonAttachment } from '@/domain/event/enterprise/entities/lesson-attachment'

export class PrismaLessonAttachmentMapper {
  static toDomain(raw: PrismaAttachment): LessonAttachment {
    if (!raw.lessonId) {
      throw new Error('Invalid attachment type.')
    }

    return LessonAttachment.create(
      {
        attachmentId: new UniqueEntityId(raw.id),
        lessonId: new UniqueEntityId(raw.lessonId),
      },
      new UniqueEntityId(raw.id),
    )
  }
}
