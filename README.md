# Ironhack Mongo Rest API

Simple REST API to allow for basic CRUD at the endpoint [https://ironrest.herokuapp.com](https://ironrest.herokuapp.com/ )

*The location of this repo will probably change to an IH one I just don't know where yet*

##### **USE WITH CAUTION. This api/database is for educational purposes and is _not_ private and is _not_ secure.**



# Usage

Simple API crud functionality.  


**See All Collection Names**


	GET /


**Find a specific collection by name**


	GET /:collection
    
*(e.g.) https://ironrest.herokuapp.com/puppies* will get all the puppies


**Create a Collection by passing any name you want.**

	POST /createCollection/:collection
    

**Delete a Collection**

	DELETE /deleteCollection/:collection
 
   
**Insert new document in collection**

	POST /:collection

*Pass post in req.body (e.g.)  /puppies, {frenchie: 'cute'}*

**Get a document by _id**

	GET /:collection/:id
    
**Delete a document by _id**

	DELETE /:collection/:id
    
**Update a document by _id**

	PUT /:collection/:id
    
*Pass update in req.body (e.g.)  /puppies, {frenchie: 'super cute'}*
   
### Additional options

**Find document by key value relationship**
   
	GET /findOne/:collection?key=value
    
 *(e.g) /findOne/puppies?frenchie=cute*
     
 **Delete document by key value relationship**

	DELETE /findOne/:collection?key=value
   
    
    