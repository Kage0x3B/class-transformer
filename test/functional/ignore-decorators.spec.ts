import 'reflect-metadata';
import { instanceToPlain } from '../../src/index';
import { Exclude, Expose } from '../../src/decorators';
import { getMetadataStorage } from '../../src/storage';

describe('ignoring specific decorators', () => {
  it('when ignoreDecorators is set to true it should ignore all decorators', () => {
    getMetadataStorage().clear();

    class User {
      id: number;

      @Expose({ name: 'lala' })
      firstName: string;

      @Expose({ groups: ['user'] })
      lastName: string;

      @Exclude()
      password: string;
    }

    const user = new User();
    user.firstName = 'Umed';
    user.lastName = 'Khudoiberdiev';
    user.password = 'imnosuperman';

    const plainedUser = instanceToPlain(user, { ignoreDecorators: true });
    expect(plainedUser).toEqual({
      firstName: 'Umed',
      lastName: 'Khudoiberdiev',
      password: 'imnosuperman',
    });
  });
});
