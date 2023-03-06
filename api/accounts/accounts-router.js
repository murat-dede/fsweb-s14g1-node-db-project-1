const router = require('express').Router();
const accountsModel = require('./accounts-model');
const mw=require('./accounts-middleware');
router.get('/', async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let allAccounts = await accountsModel.getAll();
    res.json(allAccounts);
  } catch (error) {
    next(error);
  }
})

router.get('/:id',mw.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let existAccount = req.Account;
    res.json(existAccount);
  } catch (error) {
    next();
  }
})

router.post('/', mw.checkAccountPayload,mw.checkAccountNameUnique,async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let insertedData = await accountsModel.create(req.body);
    res.json(insertedData);
  } catch (error) {
    next(error);
    
  }
})

router.put('/:id', mw.checkAccountPayload,mw.checkAccountId,mw.checkAccountNameUnique, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let updatedData = await accountsModel.updateById(req.params.id,req.body);
    res.json(updatedData);
  } catch (error) {
    next(error);
    
  }
});

router.delete('/:id',mw.checkAccountId,async (req, res, next) => {
  // KODLAR BURAYA
  try {
    await accountsModel.deleteById(res.params.id);
    res.json(req.Account);
  } catch (error) {
    next(error)
  }
});


router.use((err,res,req)=>{
  res.status(err.status||500).json({
    customMessage:'Bir hata oluştu',
    message:err.message
  });
});
module.exports = router;
