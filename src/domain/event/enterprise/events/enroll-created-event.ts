import { DomainEvent } from '@/core/events/domain-envet'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Enroll } from '../entities/enroll'

export class EnrollCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public enroll: Enroll

  constructor(enroll: Enroll) {
    this.enroll = enroll
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.enroll.id
  }
}
