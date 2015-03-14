# geobelt
NodeJS tools for geocoding, reverse geocoding, complete geohashing and polyhashing support

Geobelt currently supports OpenStreetMap Nominatim server for geocoding and reverse geocoding. The Nominatim object is using time queue to schedule 1 request per second, since this is the only constraint of the 
Nominatim open source server. 

## Features:
* Geocoding
* Reverse geocoding
* Geohashing (encode, decode, adjacent, neigbours, subs)
* polyhashes



Work in progress: 
* Writing tests
* Writing docs