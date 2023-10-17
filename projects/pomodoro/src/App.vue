<template>
  <section class="timer">
    <div class="timer__display">
      <h2 class="timer__text">{{ timerText }}</h2>
      <h1 class="timer__remaining-time">{{ remainTime }}</h1>
    </div>
    <div class="timer__controls">
      <button class="timer__buttons timer__toggle-button" @click="toggleTimer">
        <PlayCircleIcon class="timer__icons" v-if="!isStart" />
        <PauseCircleIcon class="timer__icons" v-else />
      </button>
      <button class="timer__buttons timer__reset-button" @click="resetTimer">
        <ArrowPathIcon class="timer__icons" />
      </button>
      <button class="timer__buttons timer__setting-button" @click="openModal">
        <Cog8ToothIcon class="timer__icons" />
      </button>
    </div>
  </section>
  <Teleport to="body">
    <Transition name="setting-modal">
      <setting-modal
        v-if="showModal"
        :currentWork="workMin"
        :currentRest="restMin"
        :closeModal="closeModal"
        @update-timer="setUpdatedTimer" />
    </Transition>
  </Teleport>
</template>

<script>
import {
  PlayCircleIcon,
  PauseCircleIcon,
  ArrowPathIcon,
  Cog8ToothIcon,
} from '@heroicons/vue/24/solid';

import SettingModal from './components/SettingModal.vue';

export default {
  components: {
    PlayCircleIcon,
    PauseCircleIcon,
    ArrowPathIcon,
    Cog8ToothIcon,
    SettingModal,
  },
  data() {
    return {
      min: this.setMin || 25,
      sec: 60,
      timer: null,
      isStart: false,
      workMin: null || 25,
      restMin: null || 5,
      mode: 'work',
      showModal: false,
    };
  },
  computed: {
    currentMin() {
      return this.min < 10 ? '0' + this.min : this.min;
    },
    currentSec() {
      if (this.sec < 10) {
        this.sec = '0' + this.sec;
      }

      if (this.sec === 60) {
        this.sec = '00';
      }

      return this.sec;
    },
    remainTime() {
      return this.currentMin + ':' + this.currentSec;
    },
    timerText() {
      return this.mode === 'work' ? 'Work Hard🔥' : 'Take a Rest🌴';
    },
  },
  watch: {
    mode(value) {
      if (value === 'work') {
        document.querySelector('html').classList.remove('rest-mode');
      } else {
        document.querySelector('html').classList.add('rest-mode');
      }
    },
    remainTime(value) {
      if (value === '00:00') {
        this.stopTimer();

        if (this.mode === 'work') {
          this.mode = 'rest';

          this.min = this.restMin;
          this.startTimer();
        } else {
          this.mode = 'work';

          this.min = this.workMin;
          this.startTimer();
        }
      }
    },
    workMin(newValue, oldValue) {
      if (this.mode === 'work' && oldValue !== newValue) {
        this.min = this.workMin;
      }
    },
    restMin(newValue, oldValue) {
      if (this.mode === 'rest' && oldValue !== newValue) {
        this.min = this.restMin;
      }
    },
  },
  methods: {
    startTimer() {
      this.isStart = true;
      this.timer = setInterval(() => {
        this.sec -= 1;

        if (this.sec < 0) {
          this.sec = 59;
          this.min -= 1;
        }
      }, 1000);
    },
    stopTimer() {
      this.isStart = false;
      clearInterval(this.timer);
    },
    timerAlert() {
      let alertText = 'Stop Timer';

      if (this.remainTime === '00:00' && this.mode === 'work') {
        alertText = 'Take a Rest';
      }

      if (this.remainTime === '00:00' && this.mode === 'rest') {
        alertText = 'Work Hard';
      }

      if (this.isStart) {
        alert(alertText);
      }
    },
    resetTimer() {
      this.isStart = false;
      clearInterval(this.timer);
      this.timerAlert();

      this.mode = 'work';
      this.min = this.workMin || 25;
      this.sec = 60;
    },
    toggleTimer() {
      this.isStart = !this.isStart;

      if (this.isStart) {
        this.startTimer();
      } else {
        this.stopTimer();
        this.resetTimer();
      }
    },
    setUpdatedTimer(updatedMin) {
      this.workMin = updatedMin.work;
      this.restMin = updatedMin.rest;

      this.mode = 'work';
      this.min = this.workMin;

      this.closeModal();
    },
    openModal() {
      if (this.isStart) {
        this.timerAlert();
      }

      this.stopTimer();
      this.resetTimer();
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style>
.setting-modal-enter-active,
.setting-modal-leave-active {
  transition: opacity 0.5s ease;
}

.setting-modal-enter-from,
.setting-modal-leave-to {
  opacity: 0;
}

.timer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2rem;
}

.timer__display {
  font-size: 10rem;
  font-family: 'Zen Dots', cursive;
  user-select: none;
}

.timer__text {
  font-size: 3rem;
  text-align: center;
}

.timer__controls {
  display: flex;
  gap: 3rem;
}

.timer__buttons {
  font-size: 2rem;
  color: var(--white-color);

  transition: color 0.2s;
}

html .timer__buttons:hover {
  color: var(--secondary-color);
}

html.rest-mode .timer__buttons:hover {
  color: var(--primary-color);
}

.timer__icons {
  width: 5rem;
  height: 5rem;
}
</style>
