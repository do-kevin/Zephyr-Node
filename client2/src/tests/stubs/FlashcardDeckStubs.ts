import { faker } from "@faker-js/faker";

export function getDeckListStub() {
  const originalStub = [
    {
      Tags: [
        {
          deckId: 1,
          id: 1,
          tags: "TDD",
        },
      ],
      alertInterval: null,
      dailyQuiz: false,
      id: 1,
      private: false,
      subject: "Stubbing",
      time: null,
      userId: 1,
    },
    {
      Tags: [
        {
          deckId: 2,
          id: 2,
          tags: "TDD",
        },
      ],
      alertInterval: null,
      dailyQuiz: false,
      id: 2,
      private: false,
      subject: "Mocking",
      time: null,
      userId: 1,
    },
    {
      Tags: [
        {
          deckId: 3,
          id: 3,
          tags: "react",
        },
      ],
      alertInterval: null,
      dailyQuiz: false,
      id: 3,
      private: false,
      subject: "React",
      time: null,
      userId: 1,
    },
  ];

  const newStub = originalStub.slice();

  for (let i = 4; i <= 100; i++) {
    const myString = faker.word.words();
    newStub.push({
      Tags: [
        {
          deckId: i,
          id: i,
          tags: myString,
        },
      ],
      alertInterval: null,
      dailyQuiz: false,
      id: i,
      private: false,
      subject: myString,
      time: null,
      userId: 1,
    });
  }

  return newStub;
}
