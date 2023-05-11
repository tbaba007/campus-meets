interface IResponse {
  statusText: any;
  json: any;
  text: any;
  ok: boolean;
}

export const httpJsonResponseResolver = async(response: IResponse) => {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  const data=await response.json();
  return data;

};

export const httpTextResponseResolver = async(response: IResponse) => {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
 
  const data=await response.text();
  return data;
};
