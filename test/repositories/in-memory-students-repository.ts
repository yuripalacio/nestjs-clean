import { StudentsRepository } from '@/domain/event/application/repositories/students-repository'
import { Student } from '@/domain/event/enterprise/entities/student'

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Student[] = []

  async findByEmail(email: string): Promise<Student | null> {
    const student = this.items.find((item) => item.email === email)

    if (!student) {
      return null
    }

    return student
  }

  async create(student: Student): Promise<void> {
    this.items.push(student)
  }
}
