execFnc();
function execFnc() {
    var options = {
        name: "test",
        type: "GoogleSpreadSheet",
        provider: "Google",
        uri: "https://sheets.googleapis.com/$discovery/rest?version=v4",
        spreadsheetId: "1Z4xSpck7NOOsq288HtLHp21Tz7a0aVxVpIYrDy3-7Mo",
        ranges: ["'Sheet1'!A1:B5"],
        apiKey: "AIzaSyDMH5axnnSjrsmnFS5T7KcLu-C2vfMUroA"
        //clientId: "42060572411-cpd6oiolobnflqs4mhkic23onjmlvms9.apps.googleusercontent.com"
    };
    var googleSheets = new GoogleSheets(options, gapi);
    googleSheets.queryUsingSql("", 1000, function(queryResult) {
        console.log(queryResult);
        console.log(googleSheets.responseToKvp(queryResult));
    });
}