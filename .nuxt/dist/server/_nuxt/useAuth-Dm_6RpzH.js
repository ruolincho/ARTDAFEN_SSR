import { $ as $http, a0 as USER_MODULE, a2 as useNuxtApp, a3 as useUserStore, b as ElMessage, a4 as useRouter, a5 as STORAGE_BACK_URL, a6 as HOME_URL } from "../server.mjs";
import { u as useCustomStore } from "./custom-CnGfPiQ8.js";
const getCaptchaImageApi = () => {
  return $http().get(USER_MODULE + `/oauth/captcha`);
};
const loginApi = (params) => {
  return $http().post(USER_MODULE + `/oauth/login`, params);
};
const registerApi = (params, authToken) => {
  return $http().post(USER_MODULE + `/oauth/register`, params, { headers: { "AuthToken": authToken } });
};
const resetPasswordApi = (params, authToken) => {
  return $http().post(USER_MODULE + `/oauth/rest`, params, { headers: { "AuthToken": authToken } });
};
const sendCodeApi = (params) => {
  return $http().post(USER_MODULE + `/oauth/send`, params);
};
const verifyCodeApi = (params) => {
  return $http().post(USER_MODULE + `/oauth/verify/captcha`, params);
};
const logoutApi = () => {
  return $http().post(USER_MODULE + `/oauth/logout`);
};
const useAuth = () => {
  const { $encrypt, $bus } = useNuxtApp();
  const userStore = useUserStore();
  const customStore = useCustomStore();
  const loginFn = async (params) => {
    params.inviteCode = "";
    if (params.password) {
      params.password = await $encrypt.encrypt(params.password);
    }
    return new Promise((resolve, reject) => {
      loginApi(params).then(({ data }) => {
        if (data.uuid) {
          reject({ ...data, message: "Please verify email address" });
        } else {
          successFn(data, "login", params.component);
          resolve(data);
        }
      }).catch((err) => reject(err));
    });
  };
  const registerFn = async (params, authToken) => {
    params.password = await $encrypt.encrypt(params.password);
    return new Promise((resolve, reject) => {
      registerApi(params, authToken).then(({ data }) => {
        successFn(data, "register");
        resolve(data);
      }).catch((err) => reject(err));
    });
  };
  const successFn = async (res, type, component) => {
    userStore.setToken(res.token);
    await userStore.getUserInfo();
    const router = useRouter();
    const backUrl = (void 0).localStorage.getItem(STORAGE_BACK_URL) || HOME_URL;
    !component && router.replace(backUrl);
    $bus.emit("loginSuccess");
    ElMessage.success(type === "login" ? "Login succeeded" : "Registered succeeded");
  };
  const resetPasswordFn = async (params, authToken) => {
    params.password = await $encrypt.encrypt(params.password);
    return new Promise((resolve, reject) => {
      resetPasswordApi(params, authToken).then(() => {
        resolve("Reset password success!");
      }).catch((err) => reject(err));
    });
  };
  const logoutFn = async () => {
    return new Promise((resolve, reject) => {
      logoutApi().then(() => {
        resolve("logout success");
        userStore.clear();
        customStore.clearCache();
      }).catch((err) => reject(err));
    });
  };
  const sendCodeFn = (params) => {
    return new Promise((resolve, reject) => {
      sendCodeApi(params).then((res) => {
        if (res.status == 200) {
          ElMessage.success("Verification code sent successfully, please check your email.");
          resolve("Verification code sent successfully, please check your email.");
        } else {
          reject("Verification code sending failed, please try again later.");
        }
      }).catch((err) => reject(err));
    });
  };
  const verifyCodeFn = (params) => {
    return new Promise((resolve, reject) => {
      verifyCodeApi(params).then((res) => {
        if (res.status == 200) {
          ElMessage.success("Verification code verified successfully.");
          resolve(res.data);
        } else {
          reject("Verification code error, please try again later.");
        }
      }).catch((err) => reject(err));
    });
  };
  return {
    loginFn,
    registerFn,
    logoutFn,
    resetPasswordFn,
    sendCodeFn,
    verifyCodeFn
  };
};
export {
  getCaptchaImageApi as g,
  useAuth as u
};
//# sourceMappingURL=useAuth-Dm_6RpzH.js.map
