import { Module } from '@nestjs/common'
import { Encrypter } from '@/domain/event/application/cryptography/encrypter'
import { HashCompare } from '@/domain/event/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/event/application/cryptography/hash-generator'
import { JwtEncrypt } from './jwt-encrypter'
import { BcryptHasher } from './bcrypt-hasher'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypt,
    },
    {
      provide: HashCompare,
      useClass: BcryptHasher,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, HashCompare, HashGenerator],
})
export class CryptographyModule {}
