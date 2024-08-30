import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Slug } from './value-objects/slug'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { LessonAttachmentList } from './lesson-attachment-list'

export interface LessonProps {
  teacherId: UniqueEntityId
  title: string
  content: string
  slug: Slug
  attachments: LessonAttachmentList
  createdAt: Date
  updatedAt?: Date
}

export class Lesson extends AggregateRoot<LessonProps> {
  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get teacherId() {
    return this.props.teacherId
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: LessonAttachmentList) {
    this.props.attachments = attachments
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  static create(
    props: Optional<LessonProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityId,
  ) {
    const lesson = new Lesson(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? new LessonAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return lesson
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
