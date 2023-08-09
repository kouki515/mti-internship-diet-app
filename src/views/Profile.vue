<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <form class="ui large form" @submit.prevent="submit">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input v-model="user.userId" type="text" placeholder="ID" required disabled/>
            </div>
          </div>
          
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input v-model="user.password" type="password" placeholder="password"/>
            </div>
          </div>
          
          <div class="field">
            <div class="ui left icon input">
              <i class="tag icon"></i>
              <input v-model="user.nickname" type="text" placeholder="Nickname"/>
            </div>
          </div>
          
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input v-model.number="user.age" type="text" placeholder="Age">
            </div>
          </div>
          <button class="ui huge green fluid button" type="submit">
            更新
          </button>
        </form>
      </div>
      <button @click="deleteUser" class="ui huge grey fluid button" type="submit">
        退会
      </button>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from '@/assets/config.js';

export default {
  
  name: 'Profile',

  components: {
    // 読み込んだコンポーネント名をここに記述する
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
        user: {
        userId: window.localStorage.getItem('userId'),
        password: null,
        nickname: null,
        age: null,
      },
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    async submit() {
      
      const headers = {'Authorization': 'mtiToken'};
      
      // リクエストボディを指定する
      const requestBody = {
        userId: this.user.userId,
        password: this.user.password,
        nickname: this.user.nickname,
        age: this.user.age,
      }

      try {
        /* global fetch */
        const res = await fetch(baseUrl + '/user',
        {
          method: 'PUT',
          body: JSON.stringify(requestBody),
          headers
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage);
        }
        
        // 成功時の処理
        console.log(jsonData);
      } catch (e) {
        // エラー時の処理
      }
    },
    
    async deleteUser() {
      const headers = {'Authorization': 'mtiToken'};
      
      try {
        /* global fetch */
        const res = await fetch(`${baseUrl}/user?userId=${this.user.userId}`,{
          method: 'DELETE',
          headers
        });
        
        const text = await res.text();
        const jsonData = text ?JSON.parse(text) : {};
        
        // faild
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'error message not found';
          throw new Error(errorMessage);
        }
        
        this.$router.push({name: 'Login'});
      } catch (e) {
        // error
      }
      
      
      
    }
  },
  
  created: async function() {
    const headers = {'Authorization': 'mtiToken'};
    
    try {
      /* global fetch */
      const res = await fetch(baseUrl + `/user?userId=${this.user.userId}`, {
        method: 'GET',
        headers
      });
      
      const text = await res.text();
      const jsonData = text ? JSON.parse(text) : {}

      // faild
      if (!res.ok) {
        const errorMessage = jsonData.message ?? 'error message not found';
        throw new Error(errorMessage);
      }
      
      // success
      this.user.nickname = jsonData.nickname;
      this.user.age = jsonData.age;
    } catch (e) {
      
    }
  }
}
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */
</style>
