import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { EnrollCreatedEvent } from '../events/enroll-created-event'

export interface EnrollProps {
  lessonId: UniqueEntityId
  studentId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date | null
}

export class Enroll extends AggregateRoot<EnrollProps> {
  get lessonId() {
    return this.props.lessonId
  }

  get studentId() {
    return this.props.studentId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<EnrollProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const enroll = new Enroll(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    const isNewEnroll = !id

    if (isNewEnroll) {
      enroll.addDomainEvent(new EnrollCreatedEvent(enroll))
    }

    return enroll
  }
}
