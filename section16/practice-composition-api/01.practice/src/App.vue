<template>
  <h2>My Course Goal</h2>
  <!-- Task 1: Output your main course goal with help of the composition API -->
  <!-- Don't hardcode it into the template, instead hardcode it into the JS code -->
  <h3 v-if="refIsShow">Separate Refs : {{ refMyGoal }}</h3>
  <h3 v-if="refObjMyGoal.isShow">Refs Object : {{ refObjMyGoal.goal }}</h3>
  <h3 v-if="reactiveMyGoal.isShow">
    Reactive Object : {{ reactiveMyGoal.goal }}
  </h3>
  <!-- Task 2: Toggle (show/ hide) the goal with help of the button  -->
  <button @click="toggleGoal">Toggle Goal</button>
  <!-- Task 3: Manage data in three ways -->
  <!-- => Separate refs -->
  <!-- => Ref Object -->
  <!-- => Reactive Object -->
  <!-- Task 4: Also solve the assignment with the Options API -->
</template>

<!-- 1️⃣ 2️⃣ 3️⃣ Tasks -->
<script>
import { ref, reactive } from 'vue';

export default {
  setup() {
    // Separate refs
    const refMyGoal = ref('Finish Vue Course Perfectly');
    const refIsShow = ref(true);

    // Ref Object
    const refObjMyGoal = ref({
      goal: 'Finish Vue Course Perfectly',
      isShow: true,
    });

    // Reactive Object
    const reactiveMyGoal = reactive({
      goal: 'Finish Vue Course Perfectly',
      isShow: true,
    });

    // const reactiveMyGoalRefs = toRefs(reactiveMyGoal);

    // Task 2
    const toggleGoal = () => {
      refIsShow.value = !refIsShow.value;
      refObjMyGoal.value.isShow = !refObjMyGoal.value.isShow;
      reactiveMyGoal.isShow = !reactiveMyGoal.isShow;
    };

    return {
      refMyGoal,
      refIsShow,
      refObjMyGoal,
      reactiveMyGoal,
      // reactiveGoal: reactiveMyGoalRefs.goal,
      // reactiveIsShow: reactiveMyGoalRefs.isShow,
      toggleGoal,
    };
  },
};
</script>

<!-- 4️⃣ Task -->
<!-- <script>
export default {
  data() {
    return {
      isShow: true,
      myGoal: 'Finish Vue Course Perfectly',
    };
  },
  methods: {
    toggleGoal() {
      this.isShow = !this.isShow;
    },
  },
};
</script> -->

<style>
html {
  font-family: sans-serif;
}
body {
  margin: 3rem;
  text-align: center;
}
</style>
