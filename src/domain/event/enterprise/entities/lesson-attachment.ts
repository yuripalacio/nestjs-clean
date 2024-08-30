import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface LessonAttachmentProps {
  lessonId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class LessonAttachment extends Entity<LessonAttachmentProps> {
  get lessonId() {
    return this.props.lessonId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: LessonAttachmentProps, id?: UniqueEntityId) {
    const lessonAttachment = new LessonAttachment(props, id)

    return lessonAttachment
  }
}
