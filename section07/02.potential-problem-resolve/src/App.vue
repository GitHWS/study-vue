<template>
  <div>
    <active-element
      :topic-title="activeTopic && activeTopic.title"
      :text="activeTopic && activeTopic.fullText"
    ></active-element>
    <knowledge-base></knowledge-base>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topics: [
        {
          id: 'basics',
          title: 'The Basics',
          description: 'Core Vue basics you have to know',
          fullText:
            'Vue is a great framework and it has a couple of key concepts: Data binding, events, components and reactivity - that should tell you something!',
        },
        {
          id: 'components',
          title: 'Components',
          description:
            'Components are a core concept for building Vue UIs and apps',
          fullText:
            'With components, you can split logic (and markup) into separate building blocks and then combine those building blocks (and re-use them) to build powerful user interfaces.',
        },
      ],
      activeTopic: null,
    };
  },
  // NOTE provide-inject : 특정한 곳에 특정 데이터를 제공 및 삽입하여 다른 곳에서 사용할 수 있도록 한 패턴
  // 공식 문서에 따르면 이런 패턴은 props가 불필요한 컴포넌트를 통하는 props drilling을 피하기 위해 데이터가 필요한 컴포넌트에 직접적으로 데이터를 제공하기 위해 사용한다.
  // provide 옵션을 통해 전달한 데이터는 inject 옵션을 통해 데이터를 사용할 수 있다.
  // provide-inject에서 반드시 provider는 부모 컴포넌트, injecter는 자식 컴포넌트의 관계를 가져야한다.
  // provide-inject에서는 이웃 관계의 컴포넌트 간 데이터 제공/삽입은 불가능하다.
  // provide: {
  //   // ... 제공할 데이터
  // },
  // data를 통해 선언된 데이터와 같이 인스턴스별 상태를 제공해야 하는 경우(this 키워드를 사용해야하는 경우), provide 옵션을 '함수'의 형태로 제공해야한다.

  // NOTE 프로퍼티-커스텀 이벤트를 대신하여 provide-inject를 항상 사용하는 것은 바람직하지 않다.
  // 프로퍼티-커스텀 이벤트가 컴포넌트 간 통신의 기본 메커니즘이여야한다. 데이터 전달 시 불필요한 컴포넌트의 props drilling이 있을 때만 provide-inject 사용이 고려될 수 있다.
  // 개인의 취향에 따라 props를 전달해야 할때 불필요한 컴포넌트를 여러 개 통과해야한다면 provide-inject를, 단 하나의 컴포넌트를 통과해야한다면 프로퍼티와 커스텀이벤트를 사용하는 것이 더 좋을 수 있다.
  // provide-inject는 코드를 이해하기 어렵게 만들 수 있다. 특히 큰 규모의 프로젝트 시 provide-inject는 값을 어디에서 사용되었는지 번거롭게 모든 자식 컴포넌트를 살펴보아야한다.
  provide() {
    return {
      topics: this.topics,
      selectTopic: this.activateTopic,
    };
  },
  methods: {
    activateTopic(topicId) {
      this.activeTopic = this.topics.find((topic) => topic.id === topicId);
    },
  },
  mounted() {
    setTimeout(() => {
      this.topics.push({
        id: 'event',
        title: 'Events',
        description: 'Events are important in Vue',
        fullText: 'Events allow you to trigger code on demand!',
      });
    }, 3000);
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}
section {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 2rem auto;
  max-width: 40rem;
  padding: 1rem;
  border-radius: 12px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

li {
  border-radius: 12px;
  border: 1px solid #ccc;
  padding: 1rem;
  width: 15rem;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h2 {
  margin: 0.75rem 0;
  text-align: center;
}

button {
  font: inherit;
  border: 1px solid #c70053;
  background-color: #c70053;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 30px;
  cursor: pointer;
}

button:hover,
button:active {
  background-color: #e24d8b;
  border-color: #e24d8b;
}
</style>
