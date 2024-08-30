import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateLessonController } from './controllers/create-lesson.controller'
import { FetchRecentLessonsController } from './controllers/fetch-recent-lessons.controller'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateLessonController,
    FetchRecentLessonsController,
  ],
})
export class HttpModule {}
