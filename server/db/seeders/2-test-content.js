'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Contents",
      [
        {
          question: "Какая самая маленькая птица на планете",
          answer: "Колибри",
          value: 200,
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
                {
          question: "Сколько океанов на Земле?",
          answer: "Пять",
          value: 400,
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
                        {
          question: "Какая планета вращается в обратном направлении?",
          answer: "Венера",
          value: 600,
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
                        {
          question: "Какой металл имеет наибольшую плотность?",
          answer: "Оксмий",
          value: 800,
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
                        {
          question: "Как называется самый глубокий океанический желоб?",
          answer: "Марианский",
          value: 1000,
          category_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Contents', null, {});

  }
};
