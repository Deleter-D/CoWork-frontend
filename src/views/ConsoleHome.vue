<template>
  <div style="text-align: left">
    <span class="title">欢迎！{{ this.$store.getters.GET_USERNAME }}</span>
  </div>
  <div class="summary">
    <va-card>
      <va-card-title>总览</va-card-title>
      <va-card-content>
        <div class="row">
          <div class="flex flex-col md4">
            <va-card style="width: 98%">
              <va-card-title>我的团队</va-card-title>
              <va-card-content>team</va-card-content>
            </va-card>
          </div>
          <div class="flex flex-col md4">
            <va-card style="width: 98%;left: 1%">
              <va-card-title>我的项目</va-card-title>
              <va-card-content>project</va-card-content>
            </va-card>
          </div>
          <div class="flex flex-col md4">
            <va-card style="width: 98%;left: 2%">
              <va-card-title>实用工具</va-card-title>
              <va-card-content>tools</va-card-content>
            </va-card>
          </div>
        </div>
      </va-card-content>
    </va-card>
  </div>

<!--  <div class="cards">-->
<!--    <div class="row">-->
<!--      <div class="flex flex-col md6">-->
<!--        <div class="card">-->
<!--          <va-card>-->
<!--            <va-card-title>我的团队</va-card-title>-->
<!--            <va-card-content>team</va-card-content>-->
<!--          </va-card>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="flex flex-col md6">-->
<!--        <div class="card" style="left: 2%">-->
<!--          <va-card>-->
<!--            <va-card-title>我的项目</va-card-title>-->
<!--            <va-card-content>project</va-card-content>-->
<!--          </va-card>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
export default {
  name: 'ConsoleHome'
}
</script>

<style scoped>
.title {
  font-family: "Arial Black";
  font-weight: bold;
  font-size: 2rem;
  color: #008F8C;
  position: relative;
  left: 1vw;
}

.summary {
  position: relative;
  left: 1vw;
  top: 2vh;
  width: 80vw;
}

.cards {
  width: 80vw;
  position: relative;
  left: 1vw;
  top: 5vh;
}

.card {
  width: 98%;
  position: relative;
}
</style>
