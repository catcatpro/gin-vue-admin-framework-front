<template>
    <div>
        user_list
    </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';

 const userStore = useUserStore()


onMounted(async () =>{
  await userStore.getUserInfoByToken()

})
</script>
<style lang="scss"></style>