import { Either, left, right } from './either'

function doSomething(shouldSucess: boolean): Either<string, number> {
  if (shouldSucess) {
    return right(1)
  }

  return left('error')
}

test('sucess result', () => {
  const result = doSomething(true)

  expect(result.value).toEqual(1)
  expect(result.isRight()).toBe(true)
})

test('error result', () => {
  const result = doSomething(false)

  expect(result.value).toEqual('error')
  expect(result.isLeft()).toBe(true)
})
