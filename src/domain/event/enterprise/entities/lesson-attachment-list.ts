import { WatchedList } from '@/core/entities/watched-list'
import { LessonAttachment } from './lesson-attachment'

export class LessonAttachmentList extends WatchedList<LessonAttachment> {
  compareItems(a: LessonAttachment, b: LessonAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
