import { DomainEvents } from '@/core/events/domain-envets'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { EnrollsRepository } from '@/domain/event/application/repositories/enrolls-repository'
import { Enroll } from '@/domain/event/enterprise/entities/enroll'

export class InMemoryEnrollsRepository implements EnrollsRepository {
  public items: Enroll[] = []

  async findById(id: string): Promise<Enroll | null> {
    const enroll = this.items.find((item) => item.id.toString() === id)

    if (!enroll) {
      return null
    }

    return enroll
  }

  async findManyByLessonId(
    lessonId: string,
    { page }: PaginationParams,
  ): Promise<Enroll[]> {
    const enrolls = this.items
      .filter((item) => item.lessonId.toString() === lessonId)
      .slice((page - 1) * 20, page * 20)

    return enrolls
  }

  async create(enroll: Enroll): Promise<void> {
    this.items.push(enroll)

    DomainEvents.dispatchEventsForAggregate(enroll.id)
  }

  async delete(enroll: Enroll): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === enroll.id)

    this.items.splice(itemIndex, 1)
  }
}
