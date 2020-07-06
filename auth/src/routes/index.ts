import express from 'express';
import currentUser from './current-user'
import signIn from './signin'
import signOut from './signout'
import signUp from './signup'


const userRouter = express.Router();

userRouter.get('/currentUser', currentUser);
userRouter.post('/signin', signIn);
userRouter.post('/signup', signUp);
userRouter.post('/signout', signOut);


export default userRouter