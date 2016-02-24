
// Jobs.js

exports.findProduct = function (req, res) {
  var rs = req.params.id;
  //res.send({product: rs});
  return ([
    {id: 501, name: 'Data Solutions'}
  ]);
};

exports.findById = function (req, res) {
  //res.send({id: req.params.id, name: "The Test Name", description: "The Test Description"});

  return ([
    {id: req.params.id, name: 'Data Solutions'}
  ]);
};

exports.findAll = function (req, res) {
  //console.log('in findAll');
  return ([
    {id: 144, name: 'Colo & Network Services'},
    {id: 227, name: 'Cloud'},
    {id: 325, name: 'Security'},
    {id: 400, name: 'AppliedTrust Consulting'},
    {id: 501, name: 'Data Solutions'}
  ]);
};
