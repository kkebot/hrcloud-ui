import {getUserInfoApi, loginApi, logoutApi} from '@/api/login'
import {getToken, removeToken, setToken} from '@/utils/auth'
import {delCookie} from "../../utils/cookies";
import {removeAuthority, setAuthority} from "../../utils/authority";
import {removeUsername, setUsername} from "../../utils/username";

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  auths: [],
}

const getters = {}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_AUTHS: (state, auths) => {
    state.auths = auths
  },
}

const actions = {
  login: async ({ commit }, { username, password }) => {
    try {
      let response = await loginApi(username, password);
      if (response.status === 200) {
        // const cookie = getCookie('JSESSIONID');
        // console.log({ cookie })
        // let expireTime = 1000 * 60 * 60 * 2;
        // setCookie('JSESSIONID', response.data.session);
        const [username, authority] = response.data.split(":");
        if (!!username) {
          setUsername(username);
        }
        if (!!authority) {
          setAuthority(authority)
        }
      }
      return response;
    } catch (err) {
      console.log(err) // eslint-disable-line
      return err
    }
  },

  logOut: async ({ commit, state }) => {
    try {
      let token = state.token; // TODO Remove redundant code and REST logout
      let response = await logoutApi(token);

      delCookie('JSESSIONID');
      removeUsername();
      removeAuthority();
      return response.status === 200;

    } catch (err) {
      console.log(err) // eslint-disable-line
      return err
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
