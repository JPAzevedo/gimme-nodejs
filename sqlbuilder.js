class QueryBuilder {
  constructor(pool){
    this.pool = pool;
  }

  printHello(){
    console.log("hello");
  }
}

module.exports = QueryBuilder;
