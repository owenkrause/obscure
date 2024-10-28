import { SubscriptionCard } from "./subscriptionCard";

const SUBSCRIPTION_TIERS = [
  {
    price: "0.5 NEAR",
    title: "Regular Fan",
    duration: "30 days",
    description: "Get access to exclusive content",
  },
];

export default function Subscriptions() {
  return (
    <div className="mt-6">
      {/* <h3 className="ml-6 font-bold text-2xl">Active Subscriptions</h3>
      <ul></ul> */}
      <h3 className="ml-6 font-bold text-2xl">Unlock New Content</h3>
      <ul className="flex ml-6 mt-2">
        <SubscriptionCard subscriptionTier={SUBSCRIPTION_TIERS[0]} />
      </ul>
    </div>
  );
}
