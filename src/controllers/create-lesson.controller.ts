import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'

@Controller('/lessons')
@UseGuards(JwtAuthGuard)
export class CreateLessonController {
  constructor() {}

  @Post()
  async handle(@CurrentUser() user: UserPayload) {
    console.log(user)
    return 'ok'
  }
}
