import { LessonAttachmentsRepository } from '@/domain/event/application/repositories/lesson-attachments-repository'
import { LessonAttachment } from '@/domain/event/enterprise/entities/lesson-attachment'

export class InMemoryLessonAttachmentsRepository
  implements LessonAttachmentsRepository
{
  public items: LessonAttachment[] = []

  async findManyByLessonId(lessonId: string): Promise<LessonAttachment[]> {
    const lessonAttachments = this.items.filter(
      (item) => item.lessonId.toString() === lessonId,
    )

    return lessonAttachments
  }

  async deleteManyByLessonId(lessonId: string): Promise<void> {
    const lessonAttachments = this.items.filter(
      (item) => item.lessonId.toString() !== lessonId,
    )

    this.items = lessonAttachments
  }
}
