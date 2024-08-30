import { LessonAttachmentsRepository } from '@/domain/event/application/repositories/lesson-attachments-repository'
import { LessonAttachment } from '@/domain/event/enterprise/entities/lesson-attachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaLessonAttachmentsRepository
  implements LessonAttachmentsRepository
{
  async findManyByLessonId(lessonId: string): Promise<LessonAttachment[]> {
    throw new Error('Method not implemented.')
  }

  async deleteManyByLessonId(lessonId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
