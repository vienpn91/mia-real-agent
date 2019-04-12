import httpStatus from 'http-status';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
const UserModel = require('./user.model');
const BaseController = require('../base/base.controller');
const userService = require('./user.service');
const APIError = require('../../utils/APIError');
const { ERROR_MESSAGE } = require('../../utils/APIError');
const check = require('../../utils/validate');
const { VALIDATION_TYPE } = require('../../../common/enums');
const { hashFunc, compareFunc } = require('../../utils/bcrypt');
const {
  sendUpdateProfileMail,
  sendCreatePasswordMail,
  sendChangePasswordMail,
  sendUserRegisterSuccessMail,
} = require('../../mail');
const EXPIRES_IN = '2y';

class UserController extends BaseController {
  constructor() {
    super(userService);
    this.insertProcess = this.insertProcess.bind(this);
  }

  async insert(req, res) {
    try {
      const { email, password } = req.body.data;

      await check(email, VALIDATION_TYPE.EMAIL);
      await check(password, VALIDATION_TYPE.PASSWORD);

      const isEmailExist = await userService.getByEmail(email);

      if (isEmailExist) {
        const { EMAIL_EXIST } = ERROR_MESSAGE;
        throw new APIError(EMAIL_EXIST, httpStatus.BAD_REQUEST);
      }
      const hash = await hashFunc(password);

      const user = {
        email,
        password: hash,
      };

      const userDoc = await userService.insert(user);
      userService.sendVericationEmail(email);

      return userDoc;
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async insertProcess(req, res) {
    const user = await this.insert(req, res);
    await this.updateOrderOfUser(req, res, user);

    return res.status(httpStatus.OK).send(user);
  }

  async createUser(req, res) {
    try {
      const { data } = req.body;

      const newUser = await this.service.insert(data);

      return res.status(httpStatus.OK).send(newUser);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async assignRoles(req, res) {
    try {
      const {
        user,
        body: { data: newRole },
      } = req;

      await user.set('role', newRole);

      return res.status(httpStatus.OK).send(user);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  handlePassportStrategy(accessToken, refreshToken, profile, done) {
    const condition = { $or: [] };
    let email;
    const provider = {
      id: _.get(profile, 'id'),
      name: profile.provider,
    };
    if (_.has(profile, 'emails.0.value')) {
      email = _.get(profile, 'emails.0.value');
      condition.$or.push({ email });
    }

    condition.$or.push({
      provider: {
        $elemMatch: provider,
      },
    });

    UserModel.findOne(condition).exec(async (err, user) => {
      if (err) {
        return done(err, false, { message: 'Something is wrong' });
      }

      if (!user) {
        const newUser = {
          verified: true,
          provider: [provider],
        };

        if (email) {
          newUser.email = email;
        }
        const {
          name: { familyName, givenName },
          gender,
        } = profile;
        newUser.profile = {
          firstName: givenName,
          lastName: familyName,
          gender,
        };

        const result = await userService.insert(newUser);
        if (email) {
          sendUserRegisterSuccessMail(result);
        }
        return done(false, result, { message: 'Logged In Successfully' });
      }
      // update user if user doesn't have email or provider
      const updateUser = {};
      if (!user.email && email) {
        updateUser.email = email;
      }

      if (!user.provider) {
        updateUser.provider = [provider];
      }

      // check the provider is exist in user.provider
      const providerExist = () => _.findIndex(user.provider, item => item.id === _.get(profile, 'id'))
        === -1;

      if (user.provider && providerExist()) {
        // update the user.provider array
        updateUser.provider = _.union(user.provider, [provider]);
      }

      if (_.keys(updateUser).length > 0) {
        _.assign(user, updateUser);

        await user.save();
      }

      return done(false, user, { message: 'Logged In Successfully' });
    });
  }

  // this controller is used for login with email and password
  login(req, res) {
    passport.authenticate(
      'local',
      { session: false },
      async (err, user, info) => {
        if (err || !user) {
          return res.status(400).json({
            message:
              info && info.message ? info.message : 'Something is not right',
          });
        }

        const {
          _id, email, role, verified,
        } = user;
        const token = jwt.sign({ _id }, process.env.SECRET_KEY_JWT, {
          expiresIn: EXPIRES_IN,
        });
        const userProfile = await userService.getUserProfile(user);
        return res
          .status(200)
          .json({
            token, userId: _id, email, role, verified, userProfile,
          });
      },
    )(req, res);
  }

  // this controller is used by google login
  loginWithGoogleCallback(req, res) {
    passport.authenticate(
      'google',
      {
        session: false,
      },
      async (err, user, info) => {
        if (err) {
          return res.status(400).json({
            message:
              info && info.message ? info.message : 'Something is not right',
          });
        }

        const { _id, email, verified } = user;
        const token = jwt.sign({ _id }, process.env.SECRET_KEY_JWT, {
          expiresIn: EXPIRES_IN,
        });
        return res
          .status(200)
          .redirect(`/login/callback/${token}/${_id}/${email}/${verified}`);
      },
    )(req, res);
  }

  // this controller is used by facebook login
  loginWithFacebookCallback(req, res) {
    passport.authenticate(
      'facebook',
      {
        session: false,
      },
      async (err, user, info) => {
        if (err) {
          return res.status(400).json({
            message:
              info && info.message ? info.message : 'Something is not right',
          });
        }

        const { _id, email, verified } = user;
        const token = jwt.sign({ _id }, process.env.SECRET_KEY_JWT, {
          expiresIn: EXPIRES_IN,
        });
        return res
          .status(200)
          .redirect(`/login/callback/${token}/${_id}/${email}/${verified}`);
      },
    )(req, res);
  }

  async changePassword(req, res) {
    try {
      const { user } = req;
      const { oldPassword, newPassword } = req.body.data;
      await check(oldPassword, VALIDATION_TYPE.STRING);
      await check(newPassword, VALIDATION_TYPE.PASSWORD);

      if (!user.password) {
        return this.createPassword(req, res);
      }

      const checkPassword = await compareFunc(oldPassword, user.password);

      if (!checkPassword) {
        const { PASSWORD_INCORRECT } = ERROR_MESSAGE;
        throw new APIError(PASSWORD_INCORRECT, httpStatus.FORBIDDEN);
      }

      user.password = await hashFunc(newPassword);

      const result = await user.save();
      sendChangePasswordMail(user);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async getUserProfile(req, res) {
    try {
      const { model } = req;
      const userProfile = await userService.getUserProfile(model);

      return res.status(httpStatus.OK).send(userProfile);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async updateUserProfile(req, res) {
    try {
      const { model } = req;
      const newUpdate = req.body.data;
      const newUserProfile = await userService.updateUserProfile(
        model,
        newUpdate,
      );
      sendUpdateProfileMail(newUserProfile);
      return res.status(httpStatus.OK).send(newUserProfile);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async createPassword(req, res) {
    try {
      const { user } = req;
      const { newPassword } = req.body.data;
      await check(newPassword, VALIDATION_TYPE.PASSWORD);
      const newUserProfile = await userService.createPassword(
        user,
        newPassword,
      );
      sendCreatePasswordMail(user);
      return res.status(httpStatus.OK).send(newUserProfile);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async addAddress(req, res) {
    try {
      const { user } = req;
      const address = req.body.data;
      const newUserProfile = await userService.addAddress(user, address);
      return res.status(httpStatus.OK).send(newUserProfile);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async setDefaultAddress(req, res) {
    try {
      const { user } = req;
      const { locationIndex } = req.body.data;
      const newUserProfile = await userService.setDefaultAddress(
        user,
        locationIndex,
      );
      return res.status(httpStatus.OK).send(newUserProfile);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async editAddress(req, res) {
    try {
      const { user } = req;
      const { locationIndex, address } = req.body.data;
      const newUserProfile = await userService.editAddress(
        user,
        locationIndex,
        address,
      );
      return res.status(httpStatus.OK).send(newUserProfile);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async deleteAddress(req, res) {
    try {
      const { user } = req;
      const { index } = req.params;
      const newUserProfile = await userService.deleteAddress(
        user,
        Number(index),
      );
      return res.status(httpStatus.OK).send(newUserProfile);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async sendVericationEmail(req, res) {
    try {
      const {
        params: { email },
      } = req;
      await userService.sendVericationEmail(email);
      return res.status(httpStatus.OK).send();
    } catch (error) {
      error.status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
      return res.status(error.status).send({
        error,
      });
    }
  }

  async verifyAccount(req, res) {
    try {
      const {
        params: { token },
      } = req;
      await userService.verifyAccount(token);
      return res.status(httpStatus.OK).redirect('/login');
    } catch (error) {
      error.status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
      return res.status(error.status).send({
        error,
      });
    }
  }
}

export default new UserController();
