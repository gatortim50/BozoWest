
// Jobs.js

var Jobs = [
  {id: 144, name: 'Colo & Network Services'},
  {id: 227, name: 'Cloud'},
  {id: 325, name: 'Security'},
  {id: 400, name: 'AppliedTrust Consulting'},
  {id: 501, name: 'Data Solutions'}
];

exports.findProduct = function (req, res) {
  var rs = req.params.id;
  //res.send({product: rs});
  return ([
    {id: 501, name: 'Data Solutions'}
  ]);
};

exports.findById = function (req, res) {

  var len = Jobs.length;
  var myArray = [];

  for (var i = 0; i < len; i ++) {
    var result = Jobs[i];

    if (result.id == req.params.id) {
      myArray.push(result);
      return myArray;
    }
  }

};

exports.findAll = function (req, res) {
  //console.log('in findAll');
  return (Jobs);
};
