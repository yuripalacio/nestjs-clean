import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityId } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-envet'
import { DomainEvents } from './domain-envets'
import { vi } from 'vitest'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  // eslint-disable-next-line no-use-before-define
  private aggregate: CustomAggregate

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggregate
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Register Subscriber (listening for the event "enroll")
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Creating an enroll but DON'T save it to the database yet
    const aggregate = CustomAggregate.create()

    // Ensure the event was created but NOT dispatch
    expect(aggregate.domainEvents).toHaveLength(1)

    // Save the enroll to the database, which dispatches the event
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // The subscriber listens for the event and handles the data
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
