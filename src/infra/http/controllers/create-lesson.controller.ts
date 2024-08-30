import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
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
@UseGuards(JwtAuthGuard)
export class CreateLessonController {
  constructor(private createLesson: CreateLessonUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreateLessonBodySchema,
  ) {
    const { title, content } = body
    const { sub: userId } = user

    await this.createLesson.execute({
      teacherId: userId,
      title,
      content,
      attachmentsIds: [],
    })
  }
}
