import { Either, left, right } from '@/core/either'
import { Lesson } from '../../enterprise/entities/lesson'
import { LessonsRepository } from '../repositories/lessons-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { LessonAttachmentsRepository } from '../repositories/lesson-attachments-repository'
import { LessonAttachmentList } from '../../enterprise/entities/lesson-attachment-list'
import { LessonAttachment } from '../../enterprise/entities/lesson-attachment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface EditLessonUseCaseRequest {
  lessonId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditLessonUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    lesson: Lesson
  }
>

export class EditLessonUseCase {
  constructor(
    private lessonsRepository: LessonsRepository,
    private lessonAttachmentsRepository: LessonAttachmentsRepository,
  ) {}

  async execute({
    lessonId,
    title,
    content,
    attachmentsIds,
  }: EditLessonUseCaseRequest): Promise<EditLessonUseCaseResponse> {
    const lesson = await this.lessonsRepository.findById(lessonId)

    if (!lesson) {
      return left(new ResourceNotFoundError())
    }

    const currentLessonAttachments =
      await this.lessonAttachmentsRepository.findManyByLessonId(lessonId)

    const lessonAttachmentList = new LessonAttachmentList(
      currentLessonAttachments,
    )

    const lessonAttachments = attachmentsIds.map((attachmentId) => {
      return LessonAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        lessonId: lesson.id,
      })
    })

    lessonAttachmentList.update(lessonAttachments)

    lesson.title = title
    lesson.content = content
    lesson.attachments = lessonAttachmentList

    await this.lessonsRepository.save(lesson)

    return right({
      lesson,
    })
  }
}
