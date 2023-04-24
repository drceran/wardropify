# Wardrobify

Team:

* Ramon Duarte - Hats microservice
* Esra Ceran - Shoes microservice

## Design

Wardropify is an app for manufacturers to track their hats and shoes and their locations and bins. Locations and bins were in wardrope api and we created BinVO and LocationVO models to be able to use these models' data.
In the main page there are hats (hat list), shoes(shoe list), new shoe (for creating a new shoe) and new hat (for creating a new hat) pages. We used bootstrap for delete and create buttons. Also the app is a single page application.

## Shoes microservice

In this project, shoes microservice manages shoes and shoe bins. In shoes context, I created a copy of the bin model (named BinVO) to be able to use bin models' data as in wardrope microservice. Shoe and BinVO models work together to be able to display shoe list, delete choosen shoe and create a new shoe.


## Hats microservice

I made a hats microservice that takes hats and hat location models to store and create hat information. I integrated this with the wardrobe microservice by pulling it using a locationVO model. all of the models have encoders. These microservices work together to create, delete and display hat information for the user.
