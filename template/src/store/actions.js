import { $http, handleNoLogin } from '@/utils';
import { API } from '@/config';
export const logout = ({commit, state}) => {
  handleNoLogin();
};

export const login = ({ commit }, data) => {
  return $http.post(API.LOGIN, data).then(res => { });
};
