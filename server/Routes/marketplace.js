const express = require("express");
const AppPool = require("../db/dbConnection");
const app = express.Router();
const nodemailer=require('nodemailer')

const { EMAIL, PASSWORD } = require('./env.js');
const Mailgen = require('mailgen');

app.use((req, res, next) => {
  next();
});

app.get("/GetAll", (req, res) => {
  AppPool.query('select * from meets."MarketPlace" order by "MarketPlaceId" desc', (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.send(err);
    }
  });
});

app.post("/AddNew", (req, res) => {
  const {
    RequesterId,
    Location,
    SportsId,
    Title,
    NumberOfPlayers,
    StartDate,
    InviteesId,
    Description,
    EndDate,
    StartTime,
    EndTime,
  } = req.body;

const Acceptedids=null;
  AppPool.query(
    `Insert into meets."MarketPlace"
     ("RequesterId","Location","SportsId","Title",
     "NumberOfPlayers","StartDate",
     "InviteesIds","Description",
     "EndDate","StartTime","EndTime","Acceptedids")
     VALUES
     ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
     `,
    [
      RequesterId,
      Location,
      SportsId,
      Title,
      NumberOfPlayers,
      StartDate,
      InviteesId,
      Description,
      EndDate,
      StartTime,
      EndTime,
      Acceptedids
    ],
    (err, result) => {
      if (!err) {
        res.send(result);
      } else {
        console.log(err.message)
        res.send(err.message);
      }
    }
  );
});

app.get("/GetSentRequestById/:id", (req, res) => {
  const { id } = req.params;
  AppPool.query(
    `Select U."FirstName",U."LastName",
    m."Location",m."Notified",  m."Title",S."Name" as Sport,
    m."NumberOfPlayers",m."StartDate",m."StartTime",
    m."EndDate",m."EndTime",m."Acceptedids",m."InviteesIds",m."MarketPlaceId",
    array_length(string_to_array(m."Acceptedids", ','), 1) as remaining_count
    from meets."MarketPlace"
    m join meets."User" U
    on U."UserId"= m."RequesterId"
    join meets."Sports" S
    on m."SportsId"=S."SportId"
     where m."RequesterId"=$1
    
    `,
   
    [id],
    (err, result) => {
      if (err) {
        res.send(err.message);
      } else {
        res.send(result.rows);
      }
    }
  );
});


app.get("/GetReceivedRequestById/:id", (req, res) => {
  const { id } = req.params;
  AppPool.query(
    `Select U."FirstName",U."LastName",
    m."Location",m."Title",S."Name" as Sport,
    m."NumberOfPlayers",m."StartDate",m."StartTime",
    U."UserId",U."Email",U."StudentId",U."Mobile",
    m."EndDate",m."EndTime",m."Acceptedids",m."InviteesIds",m."MarketPlaceId"
    from meets."MarketPlace"
    m join meets."User" U
    on U."UserId"= m."RequesterId"
    join meets."Sports" S
    on m."SportsId"=S."SportId"
    where m."InviteesIds" LIKE $1
     `,
    [`%${id}%`],
    (err, result) => {
      if (err) {
        console.log(err.message)
        res.send(err);
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/GetInviteRequestsById/:id", (req, res) => {
  const { id } = req.params;
  AppPool.query(
    'Select * from meets."MarketPlace" where "InviteesId" like %$1%',

    [id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result.rows);
      }
    }
  );
});



app.get("/GetAvailableEvents", (req, res) => {
  const currentdate = new Date();
  let currentTime = currentdate.getHours() + ":" + currentdate.getMinutes();
  const today = currentdate.toISOString().split("T")[0];
  console.log(today);
  console.log(currentTime);
  AppPool.query(
    `
  Select U."FirstName",U."LastName", m."Location",m."Title",S."Name" as Sport, m."MarketPlaceId", m."RequesterId", m."Description", m."NumberOfPlayers",m."StartDate",m."StartTime", m."EndDate",m."EndTime",m."Acceptedids",m."InviteesIds",array_length(string_to_array("Acceptedids", ','), 1) as acceptedcount, (m."NumberOfPlayers"-array_length(string_to_array("Acceptedids", ','), 1)) as remaining_count,
    (CASE
                              WHEN "StartDate" ::date <= $1::date
                                        AND "EndDate" :: date > $1::date
                                AND "NumberOfPlayers" > array_length(string_to_array("Acceptedids", ','), 1)
                                        AND "EndTime" ::TIME > $2 ::TIME THEN 'Active'
                                        
      
                                        WHEN "StartDate" ::date <= $1 ::date and "EndDate"  ::date >= $1 ::date and "EndTime" ::TIME > $2 ::TIME
                                        THEN 'Active'
                                   
                                   WHEN "StartDate" ::date = $1 ::date and "EndTime" ::TIME > $2  ::TIME
                                   THEN 'Active'

                              WHEN "StartDate" ::date <= $1::date
                                        AND "EndDate" :: date > $1::date
                                        AND "NumberOfPlayers" > array_length(string_to_array("Acceptedids", ','), 1)
                                        AND "EndTime" ::TIME > $2 ::TIME THEN 'Active'
        
                              WHEN "StartDate" ::date > $1::date
                              AND "NumberOfPlayers" > array_length(string_to_array("Acceptedids", ','), 1)
                              THEN 'Active'

                              WHEN "EndDate" ::date > $1 ::date
                              THEN 'Active'

                              WHEN "StartDate" ::date <= $1::date
                                        AND "EndDate" :: date = $1::date
                                        AND "NumberOfPlayers" > array_length(string_to_array("Acceptedids", ','), 1)
                                        AND "EndTime" ::TIME > $2 ::TIME THEN 'Active'

                              ELSE 'Ended'
                      END)
FROM  meets."MarketPlace" m join meets."User" U on U."UserId"= m."RequesterId" join meets."Sports" S on m."SportsId"=S."SportId"
WHERE m."InviteesIds"='{}'

  `,
    [today, currentTime],
    (err, result) => {
      if (!err) {
        const getActiveStatus = result.rows.filter((x) => x.case === "Active");
        res.send(getActiveStatus);
      } else {
        console.log(err.message);
      }
    }
  );
});




app.get("/GetAcceptedAvailableEventsById/:id", (req, res) => {
  const { id } = req.params
  const currentdate = new Date();
  let currentTime = currentdate.getHours() + ":" + currentdate.getMinutes();
  const today = currentdate.toISOString().split("T")[0];
  console.log(today);
  console.log(currentTime);
  AppPool.query(
    `
  Select U."FirstName",U."LastName", m."Location",m."Title",S."Name" as Sport, m."MarketPlaceId", m."RequesterId", m."Description", m."NumberOfPlayers",m."StartDate",m."StartTime", m."EndDate",m."EndTime",m."Acceptedids",m."InviteesIds",array_length(string_to_array("Acceptedids", ','), 1) as acceptedcount, (m."NumberOfPlayers"-array_length(string_to_array("Acceptedids", ','), 1)) as remaining_count,
    (CASE
                              WHEN "StartDate" ::date <= $1::date
                                        AND "EndDate" :: date > $1::date
                                AND "NumberOfPlayers" > array_length(string_to_array("Acceptedids", ','), 1)
                                        AND "EndTime" ::TIME > $2 ::TIME THEN 'Active'
                                        
      
                                        WHEN "StartDate" ::date <= $1 ::date and "EndDate"  ::date >= $1 ::date and "EndTime" ::TIME > $2 ::TIME
                                        THEN 'Active'
                                   
                                   WHEN "StartDate" ::date = $1 ::date and "EndTime" ::TIME > $2  ::TIME
                                   THEN 'Active'

                              WHEN "StartDate" ::date <= $1::date
                                        AND "EndDate" :: date > $1::date
                                        AND "NumberOfPlayers" > array_length(string_to_array("Acceptedids", ','), 1)
                                        AND "EndTime" ::TIME > $2 ::TIME THEN 'Active'
        
                              WHEN "StartDate" ::date > $1::date
                              AND "NumberOfPlayers" > array_length(string_to_array("Acceptedids", ','), 1)
                              THEN 'Active'

                              WHEN "EndDate" ::date > $1 ::date
                              THEN 'Active'

                              WHEN "StartDate" ::date <= $1::date
                                        AND "EndDate" :: date = $1::date
                                        AND "NumberOfPlayers" > array_length(string_to_array("Acceptedids", ','), 1)
                                        AND "EndTime" ::TIME > $2 ::TIME THEN 'Active'

                              ELSE 'Ended'
                      END)
FROM  meets."MarketPlace" m join meets."User" U on U."UserId"= m."RequesterId" join meets."Sports" S on m."SportsId"=S."SportId"
WHERE m."InviteesIds"='{}'
AND m."Acceptedids" LIKE $3

  `,
    [today, currentTime,`%${id}%`],
    (err, result) => {
      if (!err) {
        const getActiveStatus = result.rows.filter((x) => x.case === "Active");
        res.send(getActiveStatus);
      } else {
        console.log(err.message);
      }
    }
  );
});



app.get('/GetGamesCountById/:id',(req,res)=>{
  const {id}=req.params;
  console.log(id)
  AppPool.query('select * from meets."MarketPlace" where "Acceptedids" LIKE $1',[`%${id}%`],(err,results)=>{
    if(results.rows.length>0){
      const _result=results.rows.filter(x=>x.Acceptedids.split(',').find(x=>x===id));
      res.send(_result)
    }
    else{
      res.send(results.rows)
    }
  })
})





app.patch('/Join/:id',(req,res)=>{
  const {Acceptedids}=req.body;
  const {id}=req.params;

  AppPool.query(`update meets."MarketPlace" set "Acceptedids"=$1
                where "MarketPlaceId"=$2
  `,[Acceptedids,id],(err,result)=>{
    res.sendStatus(200)
  })
})

app.patch('/UnJoin/:id',(req,res)=>{
  const {id}=req.params;
  const {inviteesId}=req.body
  AppPool.query('update meets."MarketPlace" set "InviteesIds"=$1 where "MarketPlaceId"=$2',[inviteesId,id],(err,result)=>{
    if(!err){
      res.sendStatus(200)
    }
  })
})

app.patch('/UnJoinAcceptedEvent/:id',(req,res)=>{
  const {id}=req.params;
  const {Acceptedids}=req.body
  AppPool.query('update meets."MarketPlace" set "Acceptedids"=$1 where "MarketPlaceId"=$2',[Acceptedids,id],(err,result)=>{
    if(!err){
      res.sendStatus(200)
    }
  })
})

app.delete('/Delete/:id',(req,res)=>{
  const {id} =req.params;
  AppPool.query('delete from meets."MarketPlace" where "MarketPlaceId"=$1',[id],(err,results)=>{
    if(!err){
      res.sendStatus(200)
    }
  })
})



app.get('/NotifyUsers/:id', async (req, res) => {
  const { id } = req.params;

  //console.log("id", id);
  const marketDetails = await Promise.resolve(
    AppPool.query('select "Acceptedids", "Location", "StartDate","EndDate", "StartTime", "EndTime", "Title" from meets."MarketPlace" where "MarketPlaceId"=$1', [id]), function (response) {
      return response
    });

  //console.log("marketdetails", marketDetails)

  //const acceptedIds =   

  //console.log("accepted", marketDetails);
  const { Acceptedids } = marketDetails.rows[0];
  const { Location } = marketDetails.rows[0];
  const { StartDate } = marketDetails.rows[0];
  const { EndDate } = marketDetails.rows[0];
  const { StartTime } = marketDetails.rows[0];
  const { EndTime } = marketDetails.rows[0];
  const { Title } = marketDetails.rows[0];

  const split = Acceptedids.split(',')

  const data = await Promise.resolve(
    AppPool.query(`select "FirstName", "LastName", "Email" from meets."User" where "StudentId" in ('${split.join("', '")}')`), function (response) {
      return response
    })

  //console.log("data", data.rows[0]);

  let counter = 0;
  const totalEmail = data.rows.length;

  //const{FirstName, LastName} = data.rows;

  data && data.rows.map((item) => {

    userEmail = item.Email;
    const { FirstName, LastName } = item;

    let config = {
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: PASSWORD
      }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "MeetsApp",
        link: 'https://mailgen.js/'
      }
    })

    let response = {
      body: {
        name: `${FirstName} ${LastName}`,
        intro: `Welcome to MeetsApp! The event <b>${Title}</b> starting on <b>${StartDate}</b>, <b>${StartTime}</b> and ending on <b>${EndDate}</b>,<b>${EndTime}</b> at <b>${Location}</b> has just been confirmed by the organizer`,
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
      }
    }

    let mail = MailGenerator.generate(response);

    let message = {
      from: EMAIL, // sender address
      to: userEmail, // list of receivers
      subject: "Hello ✔", // Subject line
      //text: "Successfully Register with us.", // plain text body
      html: mail, // html body
    }

    transporter.sendMail(message).then(() => {
      counter++;
      if (counter === totalEmail) {
        AppPool.query('UPDATE meets."MarketPlace" SET "Notified" = true WHERE "MarketPlaceId" = $1', [id])
      .then(() => {
        return res.status(200).json({ msg: "you should receive an email" });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
      }
    }).catch((err) => {
      counter++;
      if (counter === totalEmail) {
        res.status(500).json({ err })
      }

    })

  })
})

module.exports=app;