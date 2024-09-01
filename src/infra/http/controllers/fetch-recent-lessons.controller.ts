import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchRecentLessonsUseCase } from '@/domain/event/application/use-cases/fetch-recent-lessons'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/lessons')
@UseGuards(JwtAuthGuard)
export class FetchRecentLessonsController {
  constructor(private fetchRecentLessons: FetchRecentLessonsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const lessons = await this.fetchRecentLessons.execute({
      page,
    })

    return { lessons }
  }
}
