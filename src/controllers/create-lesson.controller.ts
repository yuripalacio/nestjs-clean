import { Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('/lessons')
@UseGuards(JwtAuthGuard)
export class CreateLessonController {
  constructor() {}

  @Post()
  async handle() {
    return 'ok'
  }
}
