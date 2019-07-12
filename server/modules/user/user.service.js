import pick from 'lodash/pick';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import moment from 'moment';
import bcrypt from 'bcrypt';
import { hashFunc } from '../../utils/bcrypt';
import userCollection from './user.model';
import BaseService from '../base/base.service';
import {
  sendUserVerifyMail,
  sendUserRegisterSuccessMail,
} from '../../mail';

const { SECRET_KEY_JWT } = process.env;

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
    const profile = pick(user, ['role', 'username', 'profile', 'address', 'email']);
    return {
      ...profile,
      isNewlyLoginAsSocialNetwork,
    };
  }

  async updateUserProfile(user, newUpdate) {
    const newModel = newUpdate;
    const { profile } = user;
    _.assign(user, { profile: { ...profile, ...newModel } });

    const savedModel = await user.save();
    return this.getUserProfile(savedModel);
  }

  async createPassword(user, password) {
    const hash = await hashFunc(password);
    const newUpdate = { password: hash };
    return this.updateUserProfile(user, newUpdate);
  }

  async checkPassword(userId, password) {
    const user = await this.collection.findOne({ _id: userId }).exec();
    return bcrypt.compareSync(password, user.password);
  }

  async sendVericationEmail(email) {
    const { DOMAIN } = process.env;
    if (DOMAIN) {
      const user = await this.collection.findOne({ email }).exec();
      if (!user) {
        throw new Error('User does not exists');
      }
      const { _id: userId } = user;
      const token = jwt.sign({ userId }, SECRET_KEY_JWT);
      const vericationLink = `${DOMAIN}/api/users/verify/${token}`;
      sendUserVerifyMail(user, vericationLink);
    }
  }

  async verifyAccount(token) {
    const data = jwt.verify(token, SECRET_KEY_JWT, JWT_OPTIONS);
    const { userId } = data;
    const user = await this.collection.findOne({ _id: userId }).exec();
    const { verifiedAt } = user;
    if (verifiedAt) {
      throw new Error('Account is verified');
    }
    user.verifiedAt = moment().utc().format();
    await user.save();
    sendUserRegisterSuccessMail(user);
  }

  delete(id) {
    return this.collection.updateOne({ _id: id }, { deletedAt: new Date(), token: null }).exec();
  }

  async getUserCount(query) {
    const result = await this.collection.find(query).count();
    return result;
  }
}

export default new UserService();
