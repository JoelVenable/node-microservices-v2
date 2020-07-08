import { prop, getModelForClass, modelOptions, pre, DocumentType } from '@typegoose/typegoose'
import { Crypto } from '../services'

@modelOptions({
    schemaOptions: {
        collection: 'User',
        timestamps: true,
        toJSON: {
            transform: (doc: DocumentType<UserClass>, ret) => {
                delete ret.password;
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
})
@pre<UserClass>('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Crypto.toHash(this.get('password'))
        this.set('password', hashed)
    }
    // if (this._id === undefined || this._id === null) this._id = uuid({})
    done()
})
class UserClass {
    @prop({ required: true, index: true, unique: true })
    public email!: string

    @prop({ required: true })
    public password!: string

}






export const User = getModelForClass(UserClass);

