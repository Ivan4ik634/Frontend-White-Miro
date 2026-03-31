import api from '@/lib/axios';

class PaymentService {
  async create(data: { amount: number }): Promise<{ url: string }> {
    const res = await api.post('/payment/create', data);
    return res.data;
  }
  async success(data: { paymendId: string }): Promise<{ message: string }> {
    const res = await api.post('/payment/success', data);
    return res.data;
  }
  async cancel(data: { paymendId: string }): Promise<{ message: string }> {
    const res = await api.post('/payment/cancel', data);
    return res.data;
  }
  async cancelPremium(): Promise<string> {
    const res = await api.post('/payment/cancel-premium');
    return res.data;
  }
}
export const paymentService = new PaymentService();
