import { prop, getModelForClass, modelOptions, pre } from '@typegoose/typegoose'
import { Crypto } from '../services'

@modelOptions({ schemaOptions: { collection: 'User', timestamps: true } })
@pre<UserClass>('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Crypto.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})
class UserClass {
    @prop({ required: true, index: true, unique: true })
    public email!: string

    @prop({ required: true })
    public password!: string

}






export const User = getModelForClass(UserClass);

