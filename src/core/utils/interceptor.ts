import { IApiPagedResponse } from "../model/IApiResponse";

export const responceInterceptor = <T>(
    response: IApiPagedResponse<T>,
    success: (data: any) => void,
    failed?: (data: any) => void 
) => {
    if (response && response.status  && [200, 201, 204].indexOf(response.status) !== -1) {
        
        success(response);
    }
    else if (response.status == 401) {
        
      //Todo...
    }
    else {
        if (failed) {
            
            failed(response);
        }
        
    }
}