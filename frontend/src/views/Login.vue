<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card shadow-sm">
          <h2 class="text-center mb-3">Enter any Xter</h2>
          <form @submit.prevent="login" class="row g-3">
            <div class="col-md-12">
              <input type="text" v-model="input" class="form-control" :class="{'danger': isDanger}" placeholder="enter smth abeg..." />
              <small v-show="isDanger" style="color: red">I say enter smth ooo</small>
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-secondary w-100">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="text-center mt-2 text-muted">Explore Vue 3 Functions with CI4</div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  const router = useRouter();

  const input = ref(null)
  const isDanger = ref(false)

   function login() {
        if (!input.value) {
          isDanger.value = true
        } else {
          router.push({
            name: "tools",
          });
        }
      }
</script>

<style scoped>
.card{
  border-bottom-left-radius: 50px;
  border-top-right-radius: 50px;
  margin-top: 100px;
  padding: 50px;
}

.danger{
  border: rgb(248, 158, 158) 1px solid;
}
.danger:focus{
  border: rgb(248, 158, 158) 1px solid;
}
</style>