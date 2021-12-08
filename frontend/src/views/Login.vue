<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4" style="margin-top: 100px;">
        <div class="shadow p-5">
          <h2 class="text-center mb-3">Sign in</h2>
          <form @submit.prevent="login" class="row g-4">
            <div class="col-md-12">
              <input type="text" v-model="input.name" class="form-control" placeholder="name">
            </div>
            <div class="col-md-12">
              <input type="password" v-model="input.password" class="form-control" placeholder="password">
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-secondary w-100">Continue</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { reactive } from 'vue'
  import { useRouter } from "vue-router";
  export default {
    name: "Login",
    setup(props) {
      const router = useRouter();

      const input = reactive({
        name: '',
        password: ''
      })

      function login() {
        const required = 'emeka'
        if (input.password != required || input.name != required) {
          alert('invalid login details')
        }
        else {
          alert('Welcome ' + required)

          router.push({
            name: "dashboard",
          })
        }
      }

      return {
        input, login
      }
    }
  };
</script>

<style scoped>
  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
    box-shadow: none;
  }
</style>