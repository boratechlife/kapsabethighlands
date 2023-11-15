import { ref } from 'vue';

const user = ref(null);

function setUser(newUser) {
  user.value = newUser;
}

function getUser() {
  return user.value;
}

export { setUser, getUser };