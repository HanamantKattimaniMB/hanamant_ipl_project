const dotenv=require('dotenv')

dotenv.config({
    path:'/home/lakan/MB/testing/hanamant_ipl_project/.env'
})

module.exports={
   PORT:process.env.PORT,
   DB_HOST:process.env.DB_HOST,
   DB_USER:process.env.DB_USER,
   DB_PASS:process.env.DB_PASS,
}