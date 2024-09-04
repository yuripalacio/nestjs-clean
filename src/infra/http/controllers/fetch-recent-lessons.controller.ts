import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchRecentLessonsUseCase } from '@/domain/event/application/use-cases/fetch-recent-lessons'
import { LessonPresenter } from '../presenters/lesson-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/lessons')
export class FetchRecentLessonsController {
  constructor(private fetchRecentLessons: FetchRecentLessonsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchRecentLessons.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const lessons = result.value.lessons

    return { lessons: lessons.map(LessonPresenter.toHTTP) }
  }
}
