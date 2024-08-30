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
    const lesson = await this.prisma.lesson.findUnique({
      where: {
        slug,
      },
    })

    if (!lesson) {
      return null
    }

    return PrismaLessonMapper.toDomain(lesson)
  }

  async findManyRecent({ page }: PaginationParams): Promise<Lesson[]> {
    const lessons = await this.prisma.lesson.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return lessons.map(PrismaLessonMapper.toDomain)
  }

  async create(lesson: Lesson): Promise<void> {
    const data = PrismaLessonMapper.toPrisma(lesson)

    await this.prisma.lesson.create({
      data,
    })
  }

  async save(lesson: Lesson): Promise<void> {
    const data = PrismaLessonMapper.toPrisma(lesson)

    await this.prisma.lesson.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(lesson: Lesson): Promise<void> {
    const data = PrismaLessonMapper.toPrisma(lesson)

    await this.prisma.lesson.delete({
      where: {
        id: data.id,
      },
    })
  }
}
