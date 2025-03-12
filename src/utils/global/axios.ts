import Axios from 'axios';

import appConfig from '@/constants/global/config';

const axios = Axios.create({
  baseURL: appConfig.finmind.api,
});

export default axios;
