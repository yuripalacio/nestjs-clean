import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateLessonUseCase } from '@/domain/event/application/use-cases/create-lesson'

const createLessonBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateLessonBodySchema = z.infer<typeof createLessonBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createLessonBodySchema)

@Controller('/lessons')
export class CreateLessonController {
  constructor(private createLesson: CreateLessonUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreateLessonBodySchema,
  ) {
    const { title, content } = body
    const { sub: userId } = user

    const result = await this.createLesson.execute({
      teacherId: userId,
      title,
      content,
      attachmentsIds: [],
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
