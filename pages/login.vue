<script setup>
const { user, registerUser, loginUser } = useFirebaseAuth();

const form = reactive({ email: "", password: "" });

async function handleLogin() {
  if (form.email != " " && form.password != " ") {
    try {
      const isLoggin = await loginUser(form.email, form.password);
      // console.log("He", isLoggin);
      if (isLoggin) {
        console.log("User", localStorage.getItem("user"));
      }
    } catch (e) {
      console.log("ee", isLoggin);
    }
  }
}
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center">
    <form class="w-full lg:w-[21rem] h-[24rem] bg-white shadow rounded">
      <h4 class="text-2xl lg:text-3xl text-center font-bold mt-4">Login</h4>

      <div class="body w-full px-4 mt-4">
        <div class="group mb-10">
          <label for="" class="text-lg">Email</label>
          <input
            type="text"
            class="form-control mt-2 w-full border px-2.5 rounded py-1"
            placeholder="Email"
            v-model="form.email"
          />
        </div>
        <div class="group mb-10">
          <label for="" class="text-lg">Password</label>
          <input
            type="text"
            class="form-control mt-2 w-full border px-2.5 rounded py-1"
            placeholder="Password"
            v-model="form.password"
          />
        </div>

        <div class="group flex justify-center items-center mt-4">
          <button
            class="px-4 py-2 rounded text-white bg-red-500"
            @click.prevent="handleLogin"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
