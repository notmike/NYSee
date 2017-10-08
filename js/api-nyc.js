// ****************************************************************************
//                          API Call
//                 You can test in terminal with :
// curl --header "X-App-Token: H5nRdFQvFbsAEU3CArnrGhhys"
//      --get "https://data.ny.gov/resource/hvwh-qtfg.json?%24where=within_circle(entrance_location%2C40.824261%2C-73.945537%2C150)"
// ****************************************************************************

// ****************************************************************************
//      GET Subway Info in JSON (specify particulars in paramArray)
//
//                  for more filtering options, see:
//            https://dev.socrata.com/docs/filtering.html
// ****************************************************************************
function getSubwayData (paramArray) {
    // more secure, doesn't allow inferred variables
    'use strict';

    // ************ API Settings ******************
    const requestHost = 'data.ny.gov';
    const requestPath = '/resource/hvwh-qtfg.json';
    // private key for API calls (prob need to put this in separate file for security)
    const requestTokenValue = 'H5nRdFQvFbsAEU3CArnrGhhys';
    // ********************************************

    var https = require('https');
    // Specify header/URL info
    var options = {
        host: requestHost,
        path: requestPath + translateParameters(paramArray),
        headers: {'X-App-Token': requestTokenValue}
    };
    // async get request w/ error catching
    https.get(options, function (res) {
        var json = '';
        res.on('data', function (chunk) {
            json += chunk;
        });
        res.on('end', function () {
            if (res.statusCode === 200) {
                try {
                    var data = JSON.parse(json);
                    // Print retrieved data to console
                    displaySubwayEntranceNearMe(data);
                } catch (e) {
                    console.log('Error parsing JSON!');
                }
            } else {
                console.log('Status:', res.statusCode);
            }
        });
    }).on('error', function (err) {
        console.log('Error:', err);
    });
}

// ****************************************************************************
//                    Helper Functions
// ****************************************************************************
// Will take an array of non URI Encoded filters and URI encode them if necessary
function translateParameters(paramArr){
    var params = '';
    if (paramArr.length == 0){
        return params;
    } else {
        // If there's any parameters, add a ? before the filters
        params += '?';
    }
    // Now add in all the parameters
    for (i = 0; i < paramArr.length; i++){
        params += String(paramArr[i]);
    }
    // Encode our string of params
    var result = encodeURI(params);
    // Now ready to send in GET request to REST API call
    return result;
};

// Async prints an array of subway entrances w/in specified radius of specified lat/long
function getSubwayNearMe(lat, long, radius) {
    // Create REST Get parameters
    var paramArray = ['$where=within_circle(entrance_location,' + lat + ',' + long + ',' + radius +')'];
    getSubwayData(paramArray);
}

function displaySubwayEntranceNearMe(data){
    console.log(data);
}

// ****************************************************************************
//                    TESTING : Nearest Subway Entrances
// ****************************************************************************

// Console print subway entrances within 150 meters of the lat/long coordinates
getSubwayNearMe(40.824261, -73.945537, 250);
