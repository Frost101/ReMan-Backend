# **ReMan-Backend**
# **Project Overview**

- **ReMan** connects the **Retailers** and **Manufacturers** through a completely digital platform, without any interference from any third party.
- The frontend of the project can be found in the following repositories : [ReMan-Frontend-Manufacturer](https://github.com/Frost101/ReMan-Frontend)  [ReMan-Frontend-Retailer](https://github.com/sabahcsxgawd/ReMan-Frontend-Retailer)
- Complete workflow is shown here: [Youtube Link](https://youtu.be/NSeYYYAv3-4)


# **Project Architecture**

We followed the MVC Architecture for this project
![](public/Architecture/architecture1.png)

# **Tech Stack & Tools**

- Frontend : `React`, `HTML`, `CSS`, `JS`, `AntDesign`, `Chakra UI`
- Backend : `Node JS`, `Express JS`
- Database : `PostgreSQL`
- ORM: `Prisma`
- Payment Gateway: `sslcommerz`
- Miscellaneous : `Swagger`, `Postman`

# **API Documentation**

Swagger was used to document the API endpoints. [Swagger Link](https://reman-backend-v9rf.onrender.com/api-docs/)

# Features for Retailers

- **Marketplace Browsing**: Retailers can explore a categorized marketplace and view products from various manufacturers.
- **Bulk Ordering Discounts**: Discounts increase with higher order amounts, making bulk purchases more economical.
- **Order Management**: 
  - Place orders with a minimum quantity.
  - Modify quantities or add more products after adding to cart.
  - Apply vouchers for additional discounts.
- **Payment Options**: Support for cash-on-delivery and online payments via **SSLCommerz**.
- **Order History and Tracking**: View previous orders and track the shipment status (shipped/delivered).
- **Product Reviews and Ratings**: Provide feedback and ratings for purchased products.
- **Get Notifications**: Get notifications for order delivery and shipment of particular products.


# Features for Manufacturers

## Profile and Dashboard
- View and manage manufacturer profile.
- Home page displays key statistics:
  - Number of inventories and production houses.
  - Current orders.
  - Total goods sold this month.

## Product Management
- Add products categorized by type.
- Provide detailed product information, upload multiple images, and specify discount details.
- Display product ratings based on retailer reviews.
- Update product descriptions.
- Search and filter products for better management.

## Batch and Production House Management
- **Batch Management**:
  - Add products to production houses in batches with:
    - Manufacturing date.
    - Expiry date.
    - Quantity.
  - Visual indicators for expiry:
    - **Green**: Fresh batches.
    - **Yellow**: Older batches.
    - **Red**: Near-expiry batches.
- **Production Houses**:
  - Add and update production house information.
  - Add and manage batches and shift them to inventories if needed.

## Inventory Management
- Add and update inventory details.
- Transfer products:
  - From production house to inventory.
  - Between different inventories.
- View inventory products and their batches.
- Select batches to:
  - Add to the marketplace.
  - Apply discounts (especially for near-expiry batches).
- Search products and batches efficiently.

## Order Management
- Manage retailer orders:
  - Assign products from batches to fulfill orders.
  - Update shipment status:
    - **Shipped** after dispatching all products.
    - **Delivered** upon successful delivery.
- Receive notifications for:
  - Shipping and delivering products.
  - Shifting products between inventories and from production houses.

## Voucher Management
- Add new vouchers and update existing ones.
- Configure voucher properties:
  - Validity period.
  - Maximum usage limit.
  - Discount rate.

## Inventory Leasing
- Lease empty inventories:
  - Specify per-day rent and number of days for leasing.
  - Add inventories in the marketplace for leasing.
- Lease inventories from other manufacturers:
  - Pay via **SSLCommerz**.
  - Use leased inventory for a defined period.

## Data Analytics
- Visualize key metrics:
  - Product ratings graph.
  - Revenue trends for products.
  - Curve showing the number of products sold over time.

---

