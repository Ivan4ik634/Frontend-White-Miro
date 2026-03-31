import { Button } from '@/components/ui';
import { BillingDataT } from '@/types/Data';
import { Check, Minus } from 'lucide-react';

export const BillingSettingsCard: React.FC<
  BillingDataT & {
    onSubmit: (price: number) => void;
    isProfilePremium: boolean;
    subscriptionCancelled: 'true' | 'false';
  }
> = (props) => {
  return (
    <div className="p-4 flex flex-col border bg-zinc-200 border-zinc-800 dark:bg-zinc-800 dark:border-zinc-200 justify-between rounded-[8px] shadow-md  ">
      <div>
        <p>{props.plan}</p>
        <h1 className="mt-1 text-3xl font-semibold">${props.price} per month</h1>
        <p className="text-xl">{props.description}</p>
        <div className="mt-3 gap-y-3 flex flex-col">
          {props.advantages.map((advantage, index) => (
            <div key={index} className="flex items-center gap-x-2">
              {advantage.present === 'yes' ? (
                <div className="bg-green-500  rounded-full p-1">
                  <Check color="white" size={20} />
                </div>
              ) : (
                <div className="bg-zinc-500 rounded-full p-1">
                  <Minus color="white" size={20} />
                </div>
              )}
              <p>{advantage.text}</p>
            </div>
          ))}
        </div>
      </div>
      {props.isPremium !== props.isProfilePremium && (
        <div className="mt-10">
          <Button
            disabled={props.subscriptionCancelled === 'true'}
            onClick={() => props.onSubmit(props.price)}
            className="w-full"
          >
            Start now
          </Button>
        </div>
      )}
    </div>
  );
};
