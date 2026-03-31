import api from "@/lib/axios";

class TotpService {
    async generate(){
        const res = await api.post('/totp/generate')
        return res.data

    }
     async verify(data:{token:string}){
        const res = await api.post('/totp/verify',data)
        return res.data
    }
    async cancel(){
        const res = await api.post('/totp/cancel')
        return res.data
    }
}
export const totpService = new TotpService();