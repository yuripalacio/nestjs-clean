import { LessonAttachment } from '../../enterprise/entities/lesson-attachment'

export interface LessonAttachmentsRepository {
  findManyByLessonId(lessonId: string): Promise<LessonAttachment[]>
  deleteManyByLessonId(lessonId: string): Promise<void>
}
