import { PaginationParams } from '@/core/repositories/pagination-params'
import { LessonsRepository } from '@/domain/event/application/repositories/lessons-repository'
import { Lesson } from '@/domain/event/enterprise/entities/lesson'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaLessonMapper } from '../mappers/prisma-lesson-mapper'

@Injectable()
export class PrismaLessonsRepository implements LessonsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Lesson | null> {
    const lesson = await this.prisma.lesson.findUnique({
      where: {
        id,
      },
    })

    if (!lesson) {
      return null
    }

    return PrismaLessonMapper.toDomain(lesson)
  }

  async findBySlug(slug: string): Promise<Lesson | null> {
    throw new Error('Method not implemented.')
  }

  async findManyRecent(params: PaginationParams): Promise<Lesson[]> {
    throw new Error('Method not implemented.')
  }

  async create(lesson: Lesson): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async save(lesson: Lesson): Promise<Lesson> {
    throw new Error('Method not implemented.')
  }

  async delete(lesson: Lesson): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
