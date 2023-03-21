import { Request, Response } from 'express';
import { User, UserModel } from '../models/User';
import jwt from 'jsonwebtoken';

const User = new UserModel();
const { TOKEN_SECRET }  = process.env; 

export const index = async (req: Request, res: Response) => {
  try {
    const users = await User.index();
    res.send(users);
  } catch (err) {
    res.status(404).json(err);
  }

};


export const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.show(id);
    res.send(user);
  } catch (err) {
    res.status(404).json(err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { id, firstName, lastName, password } = req.body;
    if(!id || !firstName || !lastName || !password) {
      res
        .status(400)
        .send(
          `Error, missing or malformed parameters. (id, firstName, lastName, password) must be provied.`
        )
    }
    const user: User = { id, firstName, lastName, password };
    const createdUser = await User.create(user);
    const token = jwt.sign(
      { user: { userId: user.id, firstName: user.firstName, lastName: user.lastName }},
      TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(500).send(`Faild to creat user. Error ${err}`);
  }
};
