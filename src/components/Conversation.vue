<template>
  <va-card
    class="conversation_card"
    stripe
    stripe-color="#008F8C">
    <va-card-title>{{ role }}</va-card-title>
    <va-card-content>{{ content }}</va-card-content>
  </va-card>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Conversation',
  props: {
    role: null,
    content: null
  }
}
</script>

<style scoped>
.conversation_card {
  width: 60vw;
}
</style>
