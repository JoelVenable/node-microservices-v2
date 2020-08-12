export enum OrderStatusType {
    /** When the order has been created, but the related ticket has not been reserved. */
    CREATED = 'created',
    /** When the ticket was unable to be reserved, the user has cancelled the order, or the reservation has expired. */
    CANCELLED = 'cancelled',
    /** When the ticket has been successfully reserved. */
    AWAITING_PAYMENT = 'awaiting_payment',
    /** When the ticket has been reserved and the payment was successful. */
    COMPLETE = 'complete'
}