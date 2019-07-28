const Pool = require('pg').Pool;
const QueryBuilder = require('./sqlbuilder.js');
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'gimme',
  password: 'root',
  port: 5432,
});

var testVar = new QueryBuilder(1);

function dbTest(name){
  testVar.printHello();
  pool.query("INSERT INTO test(test_id,test_name) VALUES($1,$2)", [Math.round((Math.random()*10)), name], function (err, result) {
      console.log("joined");
      console.log("error: "+err)
  });

  pool.query("INSERT INTO test(test_id,test_name) VALUES($1,$2)", [Math.round((Math.random()*10)),"'; DROP TABLE test;"], function (err, result) {
    console.log("joined 2");
    console.log("error 2: "+err)
  });

  pool.query('SELECT * FROM test', (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows)
      results.rows.forEach(function(element){
        console.log(element);
      });
  });
}

exports.dbTest = dbTest;
