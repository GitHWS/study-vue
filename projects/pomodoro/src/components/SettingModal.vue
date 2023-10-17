<template>
  <base-backdrop>
    <base-card>
      <header class="modal__header">
        <h3 class="modal__title">⚙️ Setting</h3>
        <p class="modal__desc">You can set each time.</p>
      </header>
      <div class="modal__form">
        <form class="modal__form-inputs" @submit.prevent="setUpdatedTime">
          <div class="modal__input">
            <label for="work-min" class="modal__input-label">Work Time</label>
            <input
              class="modal__input-slider"
              id="work-min"
              type="range"
              step="5"
              min="5"
              max="60"
              list="tickmarks"
              v-model.number="workMin" />
            <datalist id="tickmarks">
              <option v-for="val in 6" :key="val" :value="val * 10" />
            </datalist>
            <span>{{ convertWorkHour }}</span>
          </div>
          <div class="modal__input">
            <label for="rest-min" class="modal__input-label">Rest Time</label>
            <input
              class="modal__input-slider"
              id="rest-min"
              type="range"
              step="5"
              min="5"
              max="60"
              list="tickmarks"
              v-model.number="restMin" />
            <datalist id="tickmarks">
              <option v-for="val in 6" :key="val" :value="val * 10" />
            </datalist>
            <span>{{ convertRestHour }}</span>
          </div>
          <footer class="modal__footer">
            <base-button type="submit">Apply</base-button>
            <base-button type="button" @click="closeModal" varient="negative"
              >Cancel</base-button
            >
          </footer>
        </form>
      </div>
    </base-card>
  </base-backdrop>
</template>

<script>
export default {
  props: ['currentWork', 'currentRest', 'closeModal'],
  data() {
    return {
      workMin: this.currentWork,
      restMin: this.currentRest,
    };
  },
  computed: {
    convertWorkHour() {
      if (this.workMin % 60 === 0) {
        return this.workMin / 60 + ' Hour';
      } else {
        return this.workMin + ' Min';
      }
    },
    convertRestHour() {
      if (this.restMin % 60 === 0) {
        return this.restMin / 60 + ' Hour';
      } else {
        return this.restMin + ' Min';
      }
    },
  },
  emits: ['update-timer'],
  methods: {
    setUpdatedTime() {
      const updateTime = {
        work: this.workMin,
        rest: this.restMin,
      };

      this.$emit('update-timer', updateTime);
    },
  },
};
</script>

<style scoped>
.modal__header {
  margin-bottom: 2rem;
}

.modal__title {
  font-size: 3rem;
  margin-top: 0;
  margin-bottom: 1rem;
}

.modal__desc {
  margin: 0;
  font-size: 1.3rem;
  color: var(--gray-color);
}

.modal__form-inputs {
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 2rem;
  font-size: 1.6rem;
}

.modal__input {
  display: flex;
  column-gap: 2rem;
}

.modal__input-slider {
  width: 30rem;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
