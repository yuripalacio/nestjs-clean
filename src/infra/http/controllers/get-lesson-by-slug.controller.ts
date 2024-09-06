import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { GetLessonBySlugUseCase } from '@/domain/event/application/use-cases/get-lesson-by-slug'
import { LessonPresenter } from '../presenters/lesson-presenter'

@Controller('/lessons/:slug')
export class GetLessonBySlugController {
  constructor(private getLessonBySlug: GetLessonBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getLessonBySlug.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const lesson = LessonPresenter.toHTTP(result.value.lesson)

    return { lesson }
  }
}
