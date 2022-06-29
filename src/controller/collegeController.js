const collegeModel= require("../models/collegeModels");
const internModel= require("../models/collegeModels");

//-------------------------POST API CREATE COLLEGE DETAILS---------------------------------------
const createCollege= async function(req,res){
    let data= req.body;
    let collegeData= await collegeModel.create(data);
    res.status(201).send({status: true, data: collegeData});
}


//-------------------------GET API COLLEGE DETAILS---------------------------------------

const  getCollegeDetails= async function (req, res) {
    try {
        const collegeName = req.query.name
        if (!collegeName) return res.status(400).send({ status: false, message: 'College name is required to access data' })
      
        const getCollege = await collegeModel.findOne({ name: collegeName }, { name: 1, fullName: 1, logoLink: 1 });
            if (!getCollege) return res.status(404).send({ status: false, message: `College does not exit` });

        const interns = await internModel.find({ collegeId: getCollege._id, isDeleted: false }, { name: 1, email: 1, mobile: 1 });
        if(!interns) return res.status(404).send({ status: false, message: `Interns does not exit`});   
        res.status(200).send({ data: { name: getCollege.name, fullName: getCollege.fullName, logoLink: getCollege.logoLink, interns: interns}})

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports= {createCollege, getCollegeDetails}