import {webSafe64} from '../utils'

describe('utils', () => {
  describe('webSafe64', () => {
    it('replaces + correctly', () => {
      expect(webSafe64('a+b')).toBe('a-b')
    })

    it('replaces / correctly', () => {
      expect(webSafe64('a/b')).toBe('a_b')
    })
  })
})