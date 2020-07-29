import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/TicketCreatedListener';
import { natsClient } from '@jdvtickets/common'

console.clear();

const start = async () => {

    await natsClient.connect({
        uniqueId: randomBytes(3).toString('hex')
    })

    const listener = new TicketCreatedListener(natsClient.getClient())
    await listener.init().catch(console.error)
}

start()


