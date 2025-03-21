import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as uuid from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  private encryptPassword(password: string): string {
    return Buffer.from(password).toString('base64');
  }

  async checkIfUserExists(email: string) {
    const user = await this.userModel.findOne({
      email,
    });

    return !!user;
  }

  async createUser(userData: CreateUserDto) {
    const checkIfUserExists = await this.checkIfUserExists(userData.email);

    if (checkIfUserExists) {
      throw new UnauthorizedException('User already exists');
    }
    const data = {
      ...userData,
      id: uuid.v4(),
      password: this.encryptPassword(userData.password),
    } as User;
    return this.userModel.create(data);
  }

  async logUserIn(userData: Partial<User>) {
    const { email, password } = userData;
    const encryptedPassword = this.encryptPassword(password ?? '');
    const user = await this.userModel.findOne({
      email,
      password: encryptedPassword,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  getUserData(id: string) {
    return this.userModel.findOne({ id });
  }

  updateUserData(id: string, userData: Partial<User>) {
    delete userData.id;

    return this.userModel.findOneAndUpdate(
      { id } as FilterQuery<User>,
      { $set: userData } as UpdateQuery<User>,
      { new: true, runValidators: true },
    );
  }
}
