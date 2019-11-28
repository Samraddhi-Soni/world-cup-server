var express=require("express");
var mysql=require("mysql");
var config=require("config");

var WorldCupRouter=express();

WorldCupRouter.use(express.json());

var connection=mysql.createConnection(
    {
        host:config.get("host"),
        database:config.get("database"),
        user:config.get("user"),
        password:config.get("password")
    }
);

connection.connect();

WorldCupRouter.get("/",(request,response)=>{

    var queryText=`select * from CricStatTB`;

    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
           response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }
    });

});

WorldCupRouter.delete("/:Venue",(request,response)=>{

    var Venue=request.params.Venue;
    console.log(Venue);
    var queryText=`delete from CricStatTB where Venue='${Venue}'`;

    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }

    });
});

WorldCupRouter.post("/",(request,response)=>{
    var Id=request.body.Id;
    var Country=request.body.Country;
    var Year=request.body.Year;
    var NoofTeam=request.body.NoofTeam;
    var Venue=request.body.Venue;

    var queryText=`insert into CricStatTB values(${Id},'${Country}',${Year},${NoofTeam},'${Venue}')`;

    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }
    });


});

module.exports=WorldCupRouter;