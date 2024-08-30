import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface InstructorProps {
  name: string
  createdAt: Date
  updatedAt?: Date
}

export class Instructor extends Entity<InstructorProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<InstructorProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const instructor = new Instructor(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return instructor
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
