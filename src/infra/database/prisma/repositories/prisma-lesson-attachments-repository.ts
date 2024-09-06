import { LessonAttachmentsRepository } from '@/domain/event/application/repositories/lesson-attachments-repository'
import { LessonAttachment } from '@/domain/event/enterprise/entities/lesson-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaLessonAttachmentMapper } from '../mappers/prisma-lesson-attachment-mapper'

@Injectable()
export class PrismaLessonAttachmentsRepository
  implements LessonAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByLessonId(lessonId: string): Promise<LessonAttachment[]> {
    const lessonAttachments = await this.prisma.attachment.findMany({
      where: {
        lessonId,
      },
    })

    return lessonAttachments.map(PrismaLessonAttachmentMapper.toDomain)
  }

  async deleteManyByLessonId(lessonId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        lessonId,
      },
    })
  }
}
