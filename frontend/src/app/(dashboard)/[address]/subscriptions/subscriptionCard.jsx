import { Button } from "@/components/ui/button";

export function SubscriptionCard({ subscriptionTier }) {
  return (
    <div className="bg-muted rounded-xl p-4">
      <p className="font-bold">{subscriptionTier.title}</p>
      <p className="font-bold my-1">
        {subscriptionTier.price}
        <span className="text-xs font-normal text-muted-foreground ml-4">
          / {subscriptionTier.duration}
        </span>{" "}
      </p>
      <Button className="w-full">Join</Button>
      <p className="mt-4 text-sm text-muted-foreground">
        {subscriptionTier.description}
      </p>
    </div>
  );
}
