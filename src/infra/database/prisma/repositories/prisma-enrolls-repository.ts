import { PaginationParams } from '@/core/repositories/pagination-params'
import { EnrollsRepository } from '@/domain/event/application/repositories/enrolls-repository'
import { Enroll } from '@/domain/event/enterprise/entities/enroll'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaEnrollMapper } from '../mappers/prisma-enroll-mapper'

@Injectable()
export class PrismaEnrollsRepository implements EnrollsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Enroll | null> {
    const enroll = await this.prisma.enroll.findUnique({
      where: {
        id,
      },
    })

    if (!enroll) {
      return null
    }

    return PrismaEnrollMapper.toDomain(enroll)
  }

  async findManyByLessonId(
    lessonId: string,
    { page }: PaginationParams,
  ): Promise<Enroll[]> {
    const enrolls = await this.prisma.enroll.findMany({
      where: {
        lessonId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return enrolls.map(PrismaEnrollMapper.toDomain)
  }

  async create(enroll: Enroll): Promise<void> {
    const data = PrismaEnrollMapper.toPrisma(enroll)

    await this.prisma.enroll.create({
      data,
    })
  }

  async delete(enroll: Enroll): Promise<void> {
    const data = PrismaEnrollMapper.toPrisma(enroll)

    await this.prisma.enroll.delete({
      where: {
        id: data.id,
      },
    })
  }
}
