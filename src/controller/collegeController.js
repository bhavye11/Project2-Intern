const collegeModel= require("../models/collegeModels");

const createCollege= async function(req,res){
    let data= req.body;
    let collegeData= await collegeModel.create(data);
    res.status(201).send({status: true, data: collegeData});
}

module.exports.createCollege = createCollege;