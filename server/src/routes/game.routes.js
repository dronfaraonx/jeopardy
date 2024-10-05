const router = require("express").Router();
const { Content, Category } = require("../../db/models");

router.get('/api/questions', async (req, res) => {
  try {
    const listOfQuestions = await Content.findAll({
      where: {
        category_id: 1, 
      },
      include: [
        {
          model: Category,
          as: 'category', 
          attributes: ['name'], 
        },
      ],
    });    
    const datta = JSON.parse(JSON.stringify(listOfQuestions))
//  console.log(datta)
    res.json(listOfQuestions);
  } catch (error) {
    console.log(error);
    res.status(500).json(listOfQuestions);
  }
});

// router.put('/api/score', async (req, res) => {
//   try {
//     const {value} = req.body;
//     const 
//   } catch (error) {
//     console.log('ERROR WHILE ADDING POINTS', error);
//   }
// })
module.exports = router;
