/*
 * @Author: Leo - [xuebin.me]
 * @Date: 2017-12-29 13:58:57
 * @Last Modified by:   Leo
 * @Last Modified time: 2017-12-29 13:58:57
 */
<template lang="pug">
    .login
        .login_user
            input(placeholder="Easemob ID", v-model="name")
        .login_pwd
            input(type="password", placeholder="Password", v-model="pwd")
        .login_text
            button(class="login_btn", @click="login") {{ $t("signIn") }}
</template>

<script>
export default {
  name: '',
  components: {},
  data: () => ({
    name: '',
    pwd: ''
  }),
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    login() {}
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
input {
  color: rgb(173, 185, 193);
}

button {
  border: none;
}

.login {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /*background: -webkit-linear-gradient(top,rgb(36,61,85) 10%,  rgb(61,92,120) 50%,rgb(36,61,85) 80%);*/
  background-color: #ffffff;
}

.login_img {
  width: 160px;
  height: 150px;
  margin: 0 auto;
}

.login_img image {
  width: 100%;
  height: 55px;
  padding-top: 55px;
}

.login_user,
.login_pwd {
  width: 100%;
  text-align: center;
}

.login_user input,
.login_pwd input {
  width: 70%;
  height: 45px;
  background-color: #ffffff;
  border: 1px solid rgb(173, 185, 193);
  border-radius: 3px;
  padding-left: 12px;
  line-height: 15px;
  font-size: 15px;
  font-family: '.SFNSText-Regular';
}

.login_user input {
  margin: 30px auto 15px auto;
}

.login_pwd input {
  margin: 15px auto 0 auto;
}

.login_text {
  width: 100%;
  height: 20px;
  margin-top: 30px;
}

.login_text view {
  width: 108px;
  margin: 0 auto;
}

.login_text text {
  font-size: 15px;
  display: inline-block;
  float: left;
  color: rgb(173, 185, 193);
}

.login_text navigator {
  font-size: 15px;
  display: inline-block;
  float: right;
  color: black;
  border-bottom: 1px solid black;
}

.login_btn {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  right: 0;
  border-radius: 0;
  line-height: 50px;
  color: rgb(255, 255, 255);
  background-color: #1aa0e5;
}

.btn_hover {
  background-color: #4f94cd;
}
</style>
