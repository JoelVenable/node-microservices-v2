import { prop, getModelForClass, modelOptions, DocumentType, plugin } from '@typegoose/typegoose'
import { AutoIncrementSimple } from '@typegoose/auto-increment'

@modelOptions({
    schemaOptions: {
        collection: 'Ticket',
        timestamps: true,
        toJSON: {
            transform: (doc: DocumentType<TicketClass>, ret) => {
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
})
@plugin(AutoIncrementSimple, [{ field: 'version' }])
// @pre<TicketClass>('save', async function (done) {
//     if (this.isModified('password')) {
//         const hashed = await CryptoService.toHash(this.get('password'))
//         this.set('password', hashed)
//     }
//     // if (this._id === undefined || this._id === null) this._id = uuid({})
//     done()
// })
class TicketClass {
    @prop({ required: true, index: true })
    public userId!: string

    @prop({ required: true })
    public title!: string

    @prop({ required: true })
    public price!: number

    @prop({ default: 1 })
    public version?: number

}



export type TicketDocument = DocumentType<TicketClass>


export const Ticket = getModelForClass(TicketClass);

