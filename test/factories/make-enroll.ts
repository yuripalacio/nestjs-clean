import { faker } from '@faker-js/faker'
import { Enroll, EnrollProps } from '@/domain/event/enterprise/entities/enroll'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export function makeEnroll(
  override: Partial<EnrollProps> = {},
  id?: UniqueEntityId,
) {
  const enroll = Enroll.create(
    {
      lessonId: new UniqueEntityId(faker.string.uuid()),
      studentId: new UniqueEntityId(faker.string.uuid()),
      ...override,
    },
    id,
  )

  return enroll
}
