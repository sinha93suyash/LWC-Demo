import { LightningElement,wire } from 'lwc';
import searchWithSpotify from '@salesforce/apex/spotifyIntegration.searchWithSpotify'
export default class SpotifyIntegration extends LightningElement {
    
    searchKey
    displayResult = false
    data;
    trackUrl;
    artistNameArr;
    handleChange(event){
        this.searchKey = event.target.value
    }

    handleSearch(){
       // Inside this data will come from apex
       this.callApex();
       this.searchKey = ''
       //this.getArtistName();
       
    }

    callApex(){
        searchWithSpotify({trackName:this.searchKey}).then(result =>{
            const response = JSON.parse(result);
            console.log(response)
            this.data = response.tracks.items[0];
            this.trackUrl =  this.data.album.images[0].url
            this.displayResult = true
        }).catch(error=>{
             console.error('error:::'+error)
        })
    }

        get ArtistName(){
            console.log(this.data.artists)
            const artistNameArr = this.data.artists.map(currArt => currArt.name)
            return artistNameArr;
            console.log('value is'+artistNameArr )
        }

    
}