import AsyncStorage from '@react-native-async-storage/async-storage';

const getCachedUrlContent = async ({
  urlAsKey,
  expireInMinutes = 60,
  url,
}: {
  urlAsKey: string;
  expireInMinutes: number;
  url: string;
}) => {
  let data = null;
  console.log('entered');
  try {
    const cachedValue = await AsyncStorage.getItem(urlAsKey);
    if (cachedValue !== null) {
      data = JSON.parse(cachedValue);
      console.log('Reading data from cache', url, data);
      if (data.expireAt && new Date(data.expireAt) < new Date()) {
        AsyncStorage.removeItem(urlAsKey);
        data = null;
        console.log('data expired');
      }
      return data;
    }
  } catch (error) {
    console.log(error);
  }

  if (data === null) {
    try {
      console.log('cache new Data ');
      const response = await fetch(url);
      console.log(response, 'response');
      const result = await response.json();
      result.expireAt = getExpireDate(expireInMinutes as number);

      const objectToStore = JSON.stringify(result);
      AsyncStorage.setItem(urlAsKey, objectToStore);

      console.log(result.expireAt);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
};

const getExpireDate = (expireInMinutes: number) => {
  const now = new Date();
  let expireTime = new Date(now);
  expireTime.setMinutes(now.getMinutes() + expireInMinutes);
  return expireTime;
};

export default getCachedUrlContent;
