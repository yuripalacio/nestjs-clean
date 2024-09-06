import { Enroll as PrismaEnroll, Prisma } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Enroll } from '@/domain/event/enterprise/entities/enroll'

export class PrismaEnrollMapper {
  static toDomain(raw: PrismaEnroll): Enroll {
    return Enroll.create(
      {
        lessonId: new UniqueEntityId(raw.lessonId),
        studentId: new UniqueEntityId(raw.studentId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(enroll: Enroll): Prisma.EnrollUncheckedCreateInput {
    return {
      id: enroll.id.toString(),
      lessonId: enroll.lessonId.toString(),
      studentId: enroll.studentId.toString(),
      createdAt: enroll.createdAt,
      updatedAt: enroll.updatedAt,
    }
  }
}
