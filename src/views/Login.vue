<template>
  <v-app class="login">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <div id="firebaseui-auth-container"></div>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component , Vue } from 'vue-property-decorator';
import firebase from "firebase";
import firebaseui from "firebaseui-ja";
import store from "../store";

@Component
export default class Login extends Vue{

  private created(){
    this.$vuetify.theme.dark = false
  }

  private mounted()  {
    // FirebaseUIインスタンス初期化
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    
    // FirebaseUIの各種設定
    const uiConfig: firebaseui.auth.Config = {
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          //console.info(authResult.user.uid);
          this.$router.push('/');
          store.commit('onAuthStateChanged',authResult.user);
          store.commit('onUserStatusChanged',authResult.user.uid? true:false);
          return false;
        },
      },
      signInOptions: [
        // サポートするプロバイダを指定
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.(サービス利用規約ページの)
      tosUrl: '',
      //アカウント選択を行う画面の防止
      credentialHelper: firebaseui.auth.CredentialHelper.NONE
    };
    // FirebaseUI描画開始
    ui.start('#firebaseui-auth-container', uiConfig );
  }
}
</script>

<style>

</style>