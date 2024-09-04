import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateLessonController } from './controllers/create-lesson.controller'
import { FetchRecentLessonsController } from './controllers/fetch-recent-lessons.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateLessonUseCase } from '@/domain/event/application/use-cases/create-lesson'
import { FetchRecentLessonsUseCase } from '@/domain/event/application/use-cases/fetch-recent-lessons'
import { RegisterStudentUseCase } from '@/domain/event/application/use-cases/register-student'
import { AuthenticateStudentUseCase } from '@/domain/event/application/use-cases/authenticate-student'
import { CryptographyModule } from '../cryptography/cryptography.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateLessonController,
    FetchRecentLessonsController,
  ],
  providers: [
    CreateLessonUseCase,
    FetchRecentLessonsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
  ],
})
export class HttpModule {}
