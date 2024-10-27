// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, Vector, AccountId } from 'near-sdk-js';

class Subscription {
  static schema = {
    creator: 'string',
    title: 'string',
    price: 'bigint',
    expiration: 'bigint'
  }

  creator: string
  title: string
  price: bigint
  expiration: bigint

  constructor(creator: string, title: string, price: bigint, expiration: bigint) {
    this.creator = creator;
    this.title = title;
    this.price = price;
    this.expiration = expiration
  }
}

@NearBindgen({})
class SubscriptionManager {
  
  subscriptions: Vector<Subscription> = new Vector<Subscription>("v-uid");

  @call({ payableFunction: true })
  create_subscription({ title, price, expiration }: { title: string, price: bigint, expiration: bigint}) {
    const creator = near.signerAccountId();
    const subscription = new Subscription(creator, title, price, expiration)

    this.subscriptions.push(subscription)
  }

  @view({})
  get_subscriptions(): Subscription[] {
    console.log(this.subscriptions.toArray())
    return this.subscriptions.toArray()
  }
}