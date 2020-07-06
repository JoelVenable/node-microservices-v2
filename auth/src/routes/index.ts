import express from 'express';
import currentUser from './current-user'
import signIn from './sign-in'
import signOut from './sign-out'
import signUp from './sign-up'


const userRouter = express.Router();

signUp(userRouter);
signIn(userRouter);
signOut(userRouter);
currentUser(userRouter);


export default userRouter