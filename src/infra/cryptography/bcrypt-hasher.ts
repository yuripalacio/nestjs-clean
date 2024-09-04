import { hash, compare } from 'bcryptjs'
import { HashCompare } from '@/domain/event/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/event/application/cryptography/hash-generator'

export class BcryptHasher implements HashGenerator, HashCompare {
  private HASH_SALT_LENGTH = 8

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
