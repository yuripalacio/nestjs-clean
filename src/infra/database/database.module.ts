import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaLessonAttachmentsRepository } from './prisma/repositories/prisma-lesson-attachments-repository'
import { PrismaLessonsRepository } from './prisma/repositories/prisma-lessons-repository'
import { PrismaEnrollsRepository } from './prisma/repositories/prisma-enrolls-repository'

@Module({
  providers: [
    PrismaService,
    PrismaLessonAttachmentsRepository,
    PrismaLessonsRepository,
    PrismaEnrollsRepository,
  ],
  exports: [
    PrismaService,
    PrismaLessonAttachmentsRepository,
    PrismaLessonsRepository,
    PrismaEnrollsRepository,
  ],
})
export class DatabaseModule {}
