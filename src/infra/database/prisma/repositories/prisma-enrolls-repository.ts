import { PaginationParams } from '@/core/repositories/pagination-params'
import { EnrollsRepository } from '@/domain/event/application/repositories/enrolls-repository'
import { Enroll } from '@/domain/event/enterprise/entities/enroll'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaEnrollsRepository implements EnrollsRepository {
  async findById(id: string): Promise<Enroll | null> {
    throw new Error('Method not implemented.')
  }

  async findManyByLessonId(
    lessonId: string,
    params: PaginationParams,
  ): Promise<Enroll[]> {
    throw new Error('Method not implemented.')
  }

  async create(enroll: Enroll): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(enroll: Enroll): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
