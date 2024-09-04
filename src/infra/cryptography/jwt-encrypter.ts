import { Encrypter } from '@/domain/event/application/cryptography/encrypter'
import { JwtService } from '@nestjs/jwt'

export class JwtEncrypt implements Encrypter {
  constructor(private jwtService: JwtService) {}

  encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload)
  }
}
