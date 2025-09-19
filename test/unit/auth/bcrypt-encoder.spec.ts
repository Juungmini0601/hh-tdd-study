import { BcryptEncoder } from '../../../src/application/auth/bcrypt-encoder';

describe('BcryptEncoder', () => {
  let encoder: BcryptEncoder = new BcryptEncoder();

  it('encode: 비밀번호를 암호화 하면 기존 비밀번호와 다른 값을 반환한다', async () => {
    const password = 'secret1234';
    const result = await encoder.encode(password);

    expect(result).not.toBe(password);
  });

  it('matches: 올바른 비밀번호면 true를 반환한다', async () => {
    const password = 'correct-password';
    const encoded = await encoder.encode(password);

    await expect(encoder.matches(password, encoded)).resolves.toBe(true);
  });

  it('matches: 잘못된 비밀번호면 false를 반환한다', async () => {
    const password = 'correct-password';
    const wrong = 'wrong-password';
    const encoded = await encoder.encode(password);

    await expect(encoder.matches(wrong, encoded)).resolves.toBe(false);
  });
});
