execFnc();
function execFnc() {
    var options = {
        name: "test",
        type: "PostgREST",
        provider: "PostgREST",
        uri: "http://localhost:3000/todos"
    };
    var postgresql = new PostgreSQL(options);
    postgresql.queryUsingSql("", 1000, function(queryResult) {
        console.log(queryResult);
        console.log(postgresql.responseToKvp(queryResult));
    });
}