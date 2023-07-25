<template>
  <section>
    <base-card>
      <!-- <template v-slot:header>
        <h2>Available Badges</h2>
      </template> -->
      <!-- slot에 name이 지정되지 않을 경우 default 슬롯으로 이동된다. default는 예약어이다. -->
      <template #default>
        <ul>
          <li>
            <base-badge type="admin" caption="ADMIN"></base-badge>
          </li>
          <li>
            <base-badge type="author" caption="AUTHOR"></base-badge>
          </li>
        </ul>
      </template>
    </base-card>
  </section>
</template>

<style scoped>
section h2 {
  margin: 0.5rem 0;
  color: #3a3a3a;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
}

li {
  margin-right: 1rem;
}
</style>
