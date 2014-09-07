/*ways to create Angular Service
1. Service
Syntax: module.service( 'serviceName', function );
Result: When declaring serviceName as an injectable argument you will be provided with an instance of the function. In other words new FunctionYouPassedToService().
2. Factory
Syntax: module.factory( 'factoryName', function );
Result: When declaring factoryName as an injectable argument you will be provided with the value that is returned by invoking the function reference passed to module.factory.
3. Provider
Syntax: module.provider( 'providerName', function );
Result: When declaring providerName as an injectable argument you will be provided with ProviderFunction().$get(). The constructor function is instantiated before the $get method is called - ProviderFunction is the function reference passed to module.provider.

ref:http://stackoverflow.com/questions/15666048/service-vs-provider-vs-factory?lq=1
*/

/*This service is repsonsible for sending 
HTTP request to Foursquare explore places API*/

/*For more info about Foursquare API and how to get a client ID and secret visit
https://developer.foursquare.com/docs/venues/explore*/

var requestParms = {
    clientId: "DO5JJHGXBODWHZUZ2W45T0S35PKJH3MCLC1SKF5U4X3VF4YA",
    clientSecret: "GF0PDCNGEKSU2GI4ANGBGBKTEUU0G3E3QYPO5YWFXRV33GY5",
    version: "20131230"
}

//$resource built in Angular service which allow us to interact with RESTful data sources.
//we can also use lower level built-in service $http
app.factory('placesExplorerService', function ($resource) {

    //:action param will be translated to a part of the request URL and any other 
    //params will be treated as query string (key,value) pairs.
    var requestUri = 'https://api.foursquare.com/v2/venues/:action';

    //$resource configuration:
    return $resource(requestUri,
        {
            action: 'explore',
            client_id: requestParms.clientId,
            client_secret: requestParms.clientSecret,
            v: requestParms.version,
            venuePhotos: '1',
            callback: 'JSON_CALLBACK'
        },
        {
            get: { method: 'JSONP' }
        });
});