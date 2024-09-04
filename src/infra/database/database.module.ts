import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaLessonAttachmentsRepository } from './prisma/repositories/prisma-lesson-attachments-repository'
import { PrismaLessonsRepository } from './prisma/repositories/prisma-lessons-repository'
import { PrismaEnrollsRepository } from './prisma/repositories/prisma-enrolls-repository'
import { LessonsRepository } from '@/domain/event/application/repositories/lessons-repository'
import { StudentsRepository } from '@/domain/event/application/repositories/students-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'

@Module({
  providers: [
    PrismaService,
    PrismaLessonAttachmentsRepository,
    {
      provide: LessonsRepository,
      useClass: PrismaLessonsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    PrismaEnrollsRepository,
  ],
  exports: [
    PrismaService,
    PrismaLessonAttachmentsRepository,
    LessonsRepository,
    PrismaEnrollsRepository,
    StudentsRepository,
  ],
})
export class DatabaseModule {}
