'use client';
import { PAGES } from '@/config/pages';
import { paymentService } from '@/services/Payment.service';
import { Check, Loader, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {}

export const PaymentCancel: React.FC<Props> = (props) => {
  const param: { id: string } = useParams();
  const [status, setStatus] = useState<'pending' | 'error' | 'success'>('pending');
  const router = useRouter();
  useEffect(() => {
    paymentService
      .cancel({ paymendId: param.id })
      .then((res) => {
        if ('message' in res) toast.success(res.message);
        setStatus('success');
        router.push(PAGES.dashboard);
      })
      .catch(() => setStatus('error'));
  }, [param.id]);
  return (
    <div className="absolute top-[50%] left-[50%] translate-[-50%]">
      <div className="gap-x-2 flex items-center">
        {status === 'pending' ? (
          <>
            <Loader className="animate-spin" />
          </>
        ) : status === 'error' ? (
          <>
            <X />
            <p>Error</p>
          </>
        ) : (
          <>
            <Check />
            <p>Success</p>
          </>
        )}
      </div>
    </div>
  );
};
