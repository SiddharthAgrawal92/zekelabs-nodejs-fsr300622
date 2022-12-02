# zekelabs-nodejs-fsr300622
For Server APIs


//Authentication & Authorization 

//Server protected

//1. Sign-up
//2. login with your credentials --> 

//role = customer --> authorized to call APIs allowed for customer          
        --> get available products
        JWT-> is used to call set available products will get rejected as he's not authorized

//role = inventory_admin --> authorized to call inventory_admin APIs (add the products to the site)
        --> get available products
        --> set available products

//role = super-admin
        --> list of customer
        --> list of inventory_admin
        --> list of all admins in the world

//multiple views are available for multiple roles