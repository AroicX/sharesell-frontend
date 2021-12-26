import requests from '@/services/index'

export async function BUSINESS_DETAILS (data, callback, onError) {
    try {
        let business = await requests.post(`/update-profile/business-details`, data)
        console.log(business);
        if(business.data){
            callback && callback(business.data)
        }else {
            throw business
        }
        return business;
    }catch (err) {
        onError && onError(err)
    }
}