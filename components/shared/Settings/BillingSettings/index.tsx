'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { billingData } from '@/data/billingData';
import { paymentService } from '@/services/Payment.service';
import { UserT } from '@/types/User';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { BillingSettingsCard } from './BillingSettingsCard';

interface Props {
  profile: UserT;
}

export const BillingSettings: React.FC<Props> = ({ profile }) => {
  const router = useRouter();
  const handlePaymentCreated = async (price: number) => {
    const res = await paymentService.create({ amount: price });

    router.push(res.url);
  };
  const handleCancelPremium = async () => {
    const res = await paymentService.cancelPremium();
    toast.success(res);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>
          This contains the paid and free version of the application
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full mt-3">
        <div>
          <div className="w-full mb-10 items-center justify-center flex flex-col">
            <div className="w-[50%] max-[900px]:w-[75%] max-[500px]:w-full items-center justify-center flex flex-col">
              <Avatar className="mb-3 w-[75px] h-[75px]">
                <AvatarFallback>{profile.username[0]}</AvatarFallback>
                <AvatarImage src={profile.avatar} />
              </Avatar>
              {profile.isPremium ? (
                <>
                  <h1 className="text-2xl font-semibold text-center">
                    You have a <span className="text-yellow-500">Premium plan</span>
                  </h1>
                  <p className="opacity-50 text-center">
                    Using templates, you can create and reuse an element very quickly, templates
                    allow you to create boards, tasks, and comments
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-semibold text-center">
                    You have a <span className="text-green-500">Free plan</span>
                  </h1>
                  <p className="opacity-50 text-center">
                    Create projects, tasks, and comments using tools for your convenience.
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 mt-3 max-[500px]:grid-cols-1  gap-[30px]">
            {billingData.map((data, index) => (
              <BillingSettingsCard
                key={index}
                subscriptionCancelled={profile.subscriptionCancelled}
                isProfilePremium={profile.isPremium}
                onSubmit={(price) =>
                  index !== 0 ? handlePaymentCreated(price) : handleCancelPremium()
                }
                {...data}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
