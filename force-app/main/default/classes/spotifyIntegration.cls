public with sharing class spotifyIntegration {
    @AuraEnabled
    public static string searchWithSpotify(String trackName){
        Http http = new Http();
        
        Httprequest req = new Httprequest();
        req.setMethod('GET');
        String encodeName = EncodingUtil.urlEncode(trackName, 'UTF-8');


        //https://api.spotify.com/v1/search?q=kaho+na+pyaar+hai&type=track&limit=1&offset=1

        req.setEndPoint('callout:Spotify/v1/search?q='+encodeName+'&type=track&limit=1&offset=1');

        //send the request
        try {
            HttpResponse res = http.send(req);
            system.debug('response:::'+ res.getBody());
            system.debug('response status Code:::'+res.getStatusCode());
            system.debug('response status:::'+res.getStatus());
            return res.getBody();
        } catch (exception ex) {
            system.debug(ex.getMessage());
            return ex.getMessage();
        }
    }   
}