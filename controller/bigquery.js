const {BigQuery } = require('@google-cloud/bigquery')
require('dotenv').config()
const bigquery = new BigQuery

const getdata = async(req,res)=>{

    try{
    const query = 'SELECT * FROM `sacred-catfish-415008.aruldb_dataset.fileData` LIMIT 1000'
    const [getData] = await bigquery.query(query)
    if(getData.length === 0){
        return res.status(404).json({error : "No Data  FOUND"});
       }
    res.status(200).json(getData)
   }catch(err){
    console.log(err.message);
    res.status(500).json({ error : err.message });
   }
} 

const campaign_ID = async(req,res)=>{
    const campaign_ID = req.params.campaign_ID
    try{
        const query = `SELECT * FROM \`sacred-catfish-415008.aruldb_dataset.fileData\` WHERE Campaign_ID = '${campaign_ID}' LIMIT 1000`;
       const [getData] = await bigquery.query(query)
       if(getData.length === 0){
        return res.status(404).json({error : "No campaign_ID  FOUND"});
       }

     res.status(200).json(getData)
    }catch(err){
     console.log(err.message);
      res.status(500).json({ error : err.message });
    }
 }
 
 const FSN_ID = async(req,res)=>{
    const FSN_ID  = req.params.FSN_ID
    try{
        const query = `SELECT * FROM \`sacred-catfish-415008.aruldb_dataset.fileData\` WHERE FSN_ID = '${FSN_ID}' LIMIT 1000`;
       const [getData] = await bigquery.query(query)
       if(getData.length === 0){
        return res.status(404).json({error : "No FSN_ID FOUND"});
       }
     res.status(200).json(getData)
    }catch(err){
     console.log(err.message);
     res.status(500).json({error : err.message});
    }
 }

 const Ad_Group_ID = async(req,res)=>{
    const Ad_Group_ID  = req.params.Ad_Group_ID
    try{
       const query = `SELECT * FROM \`sacred-catfish-415008.aruldb_dataset.fileData\` WHERE Ad_Group_ID = '${Ad_Group_ID}' LIMIT 1000`;
       const [getData] = await bigquery.query(query)
       if(getData.length === 0){
        return res.status(404).json({error : "No Ad_Group_ID FOUND"});
       }
       res.status(200).json(getData)
    }catch(err){
     console.log(err.message);
     res.status(500).json({error : err.message});
    }
 } 

 const product_Name = async(req,res)=>{
    const product_Name  = req.params.product_Name
    try{
       const query = `SELECT * FROM \`sacred-catfish-415008.aruldb_dataset.fileData\` WHERE product_Name = '${product_Name}' LIMIT 1000`;
       const [getData] = await bigquery.query(query)
       if(getData.length === 0){
       return res.status(404).json({error : "No product_Name FOUND "});
       }
       res.status(200).json(getData)
    }catch(err){
     console.log(err.message);
     res.status(500).json({error : err.message});
    }
 } 

 const campaign_Name = async(req,res)=>{
    const campaign_Name   = req.params.campaign_Name
    try{
       const query = `SELECT * FROM \`sacred-catfish-415008.aruldb_dataset.fileData\` WHERE campaign_Name  = '${campaign_Name}' LIMIT 1000`;
       const [getData] = await bigquery.query(query)
       if(!getData || getData.length === 0){
       return res.status(404).json({error : "No campaign_Name FOUND"});
       }
       res.status(200).json(getData)
    }catch(err){
     console.log(err.message);
     res.status(500).json({error : err.message});
    }
 } 

module.exports = {getdata,campaign_ID,Ad_Group_ID,FSN_ID,product_Name,campaign_Name}
