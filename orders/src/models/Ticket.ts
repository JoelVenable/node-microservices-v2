import { prop, getModelForClass, modelOptions, DocumentType, plugin } from '@typegoose/typegoose'
import { AutoIncrementSimple } from '@typegoose/auto-increment'
import { Order, OrderStatusType } from './Order';

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
export class TicketClass {

    @prop({ required: true })
    public title!: string

    @prop({ required: true })
    public price!: number

    @prop({ default: 1 })
    public version?: number

    public async isReserved(): Promise<boolean> {
        // Find all orders where ticket === requestedTicket, and status is not cancelled.  
        // If we find an order, then the ticket is reserved.
        const existingOrder = await Order.find({
            ticket: this,
            status: {
                $in: [OrderStatusType.CREATED, OrderStatusType.AWAITING_PAYMENT, OrderStatusType.COMPLETE]
            }
        }).populate('Ticket')
        return Boolean(existingOrder.length > 0)
    }



}


export type TicketDocument = DocumentType<TicketClass>


export const Ticket = getModelForClass(TicketClass);


