import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateLessonController } from './controllers/create-lesson.controller'
import { FetchRecentLessonsController } from './controllers/fetch-recent-lessons.controller'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateLessonController,
    FetchRecentLessonsController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
