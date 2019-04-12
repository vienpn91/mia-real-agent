import pick from 'lodash/pick';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { hashFunc } from '../../utils/bcrypt';
import userCollection from './user.model';
import BaseService from '../base/base.service';
import {
  sendUserVerifyMail,
  sendUserRegisterSuccessMail,
} from '../../mail';

const { SECRET_KEY_JWT } = process.env;
const JWT_OPTIONS = {
  expiresIn: '1d',
};

class UserService extends BaseService {
  constructor() {
    super(userCollection);
  }

  getByEmail(email) {
    return userCollection.findOne({ email }).exec();
  }

  async getUserProfile(user) {
    const { password } = user;
    const isNewlyLoginAsSocialNetwork = !password;
    const profile = pick(user, ['profile', 'address', 'email']);
    return {
      ...profile,
      isNewlyLoginAsSocialNetwork,
    };
  }

  async updateUserProfile(user, newUpdate) {
    const newModel = newUpdate;
    _.assign(user, newModel);

    const savedModel = await user.save();
    return this.getUserProfile(savedModel);
  }

  async createPassword(user, password) {
    const hash = await hashFunc(password);
    const newUpdate = { password: hash };
    return this.updateUserProfile(user, newUpdate);
  }

  async addAddress(user, address) {
    const currentAddress = user.address;
    const currentAddressDefaultIndex = currentAddress.defaultIndex;
    const currentAddressList = currentAddress.list;
    if (currentAddressList.length >= 3) {
      throw new Error('Allowed address count is 3');
    }
    const updatedAddressList = [...currentAddressList, address];
    const updatedUser = {
      address: {
        ...currentAddress,
        defaultIndex: currentAddressDefaultIndex || 0,
        list: updatedAddressList,
      },
    };
    _.assign(user, updatedUser);
    const savedModel = await user.save();
    return this.getUserProfile(savedModel);
  }

  async setDefaultAddress(user, locationIndex) {
    const currentAddressList = user.address.list;
    if (locationIndex < 0 || locationIndex >= currentAddressList.length) {
      throw new Error("Address's index is invalid");
    }
    const updatedUser = {
      address: {
        defaultIndex: locationIndex,
        list: currentAddressList,
      },
    };
    _.assign(user, updatedUser);
    const savedModel = await user.save();
    return this.getUserProfile(savedModel);
  }

  async editAddress(user, locationIndex, address) {
    const currentDefaultIndex = user.address.defaultIndex;
    const currentAddressList = user.address.list;
    if (locationIndex < 0 || locationIndex >= currentAddressList.length) {
      throw new Error("Address's index is invalid");
    }
    const updatedAddressList = [...currentAddressList];
    updatedAddressList[locationIndex] = address;
    const updatedUser = {
      address: {
        defaultIndex: currentDefaultIndex,
        list: updatedAddressList,
      },
    };
    _.assign(user, updatedUser);
    const savedModel = await user.save();
    return this.getUserProfile(savedModel);
  }

  async deleteAddress(user, index) {
    const address = _.get(user, 'address', {});
    const currentDefaultIndex = _.get(address, 'defaultIndex');
    const addressList = _.get(address, 'list', []);
    if (
      index < 0
      || index >= addressList.length
      || index === address.defaultIndex
    ) {
      throw new Error("Address's index is invalid");
    }
    const newAddressList = _.filter(addressList, (e, ind) => ind !== index);
    const updatedUser = {
      address: {
        defaultIndex:
          index > currentDefaultIndex
            ? currentDefaultIndex
            : currentDefaultIndex - 1,
        list: newAddressList,
      },
    };
    _.assign(user, updatedUser);
    const savedModel = await user.save();
    return this.getUserProfile(savedModel);
  }

  async sendVericationEmail(email) {
    const { DOMAIN } = process.env;
    if (DOMAIN) {
      const user = await this.collection.findOne({ email }).exec();
      if (!user) {
        throw new Error('User does not exists');
      }
      const { _id: userId } = user;
      const token = jwt.sign({ userId }, SECRET_KEY_JWT, JWT_OPTIONS);
      const vericationLink = `${DOMAIN}/api/users/verify/${token}`;
      sendUserVerifyMail(user, vericationLink);
    }
  }

  async verifyAccount(token) {
    const data = jwt.verify(token, SECRET_KEY_JWT, JWT_OPTIONS);
    const { userId } = data;
    const user = await this.collection.findOne({ _id: userId }).exec();
    const { verified } = user;
    if (verified) {
      throw new Error('Account is verified');
    }
    user.verified = true;
    await user.save();
    sendUserRegisterSuccessMail(user);
  }
}

export default new UserService();
