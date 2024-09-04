import { User as PrismaStudent, Prisma } from '@prisma/client'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Student } from '@/domain/event/enterprise/entities/student'

export class PrismaStudentMapper {
  static toDomain(raw: PrismaStudent): Student {
    return Student.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
      createdAt: student.createdAt,
    }
  }
}
