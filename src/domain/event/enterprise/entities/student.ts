import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface StudentProps {
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt?: Date
}

export class Student extends Entity<StudentProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.name = name
    this.touch()
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<StudentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const student = new Student(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return student
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
