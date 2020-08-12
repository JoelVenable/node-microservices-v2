import { prop, getModelForClass, modelOptions, DocumentType, plugin, Ref } from '@typegoose/typegoose'
import { AutoIncrementSimple } from '@typegoose/auto-increment'
import { TicketClass } from './Ticket'

export enum OrderStatusType {
    CREATED = 'created',
    CANCELLED = 'cancelled',
    AWAITING_PAYMENT = 'awaiting_payment',
    COMPLETE = 'complete'
}

@modelOptions({
    schemaOptions: {
        collection: 'Order',
        timestamps: true,
        toJSON: {
            transform: (doc: DocumentType<OrderClass>, ret) => {
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
})
@plugin(AutoIncrementSimple, [{ field: 'version' }])
// @pre<OrderClass>('save', async function (done) {
//     if (this.isModified('password')) {
//         const hashed = await CryptoService.toHash(this.get('password'))
//         this.set('password', hashed)
//     }
//     // if (this._id === undefined || this._id === null) this._id = uuid({})
//     done()
// })
class OrderClass {
    @prop({ required: true, index: true })
    public userId!: string

    @prop({ required: true })
    public status!: OrderStatusType

    @prop({ required: false })
    public expiresAt?: Date

    @prop({ default: 1 })
    public version?: number

    @prop({ ref: TicketClass })
    public ticket!: Ref<TicketClass>

}



export type OrderDocument = DocumentType<OrderClass>


export const Order = getModelForClass(OrderClass);

