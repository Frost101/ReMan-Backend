const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//* Array of products
function getOnSaleProducts(req, res) {
    let output = {
        products: [{
            PID: 123456,
            MID: 123456,
            productName: 'Mojito',
            price: 10,
            productImage: 'public/images/mojito.jpg',
            batch : [123456, 256457, 256423],
            quantity: 1000,
            saleRate: 50,
            manufacturerName: 'Fresh',
            manufacturerLogo: 'public/images/fresh.jpg',
            weightVolume: 250,
            unit: 'mL',
        },
        {
            PID: 654321,
            MID: 987451,
            productName: 'Chocolate Milk',
            price: 15,
            productImage: 'public/images/chocolateMilk.jpg',
            batch : [123456, 25645],
            quantity: 5000,
            saleRate: 70,
            manufacturerName: 'Aarong',
            manufacturerLogo: 'public/images/aarong.jpg',
            weightVolume: 1,
            unit: 'L',
        }
    ]
    };

    res.json(output);
}



async function getAllCategories(req, res) {
  
    try {
      const categories = await prisma.category.findMany({
        select: {
          CategoryName: true,
          Image: true,
        },
      });
  
      if (categories) {   
        res.status(200).json({ categories});
      } else {
        res.status(404).json({ error: 'Categories not found' });
      }
    } catch (error) {
      console.error('Error retrieving Categories:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
    // let output = {
    //     categories: [{
    //         categoryName: 'Beverage',
    //         categoryImage: 'public/images/beverage.jpg',
    //     },
    //     {
    //         categoryName: 'Dairy',
    //         categoryImage: 'public/images/dairy.jpg',
    //     }
    // ]
    // };

    // res.json(output);
}




async function getRecommendedCategories(req, res) {

    try {
        const categories = await prisma.category.findMany({
          where: {
            PopularityStatus: true,
          } , 
          select: {
            CategoryName: true,
            Image: true,
          },
        });
    
        if (categories) {   
          res.status(200).json({ categories});
        } else {
          res.status(404).json({ error: 'Categories not found' });
        }
      } catch (error) {
        console.error('Error retrieving Categories:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    // let output = {
    //     categories: [{
    //         categoryName: 'Beverage',
    //         categoryImage: 'public/images/beverage.jpg',
    //     },
    //     {
    //         categoryName: 'Dairy',
    //         categoryImage: 'public/images/dairy.jpg',
    //     }
    // ]
    // };

    // res.json(output);
}



function getProductsByManufacturer(req, res) {
    let output = {
        products: [{
            PID: 123456,
            productName: 'Mojito',
            productImage: 'public/images/mojito.jpg',
            quantity: 1000,
            categoryName: 'Beverage',
            weightVolume: 250,
            unit: 'mL',
            rating: 4,
        },
        {
            PID: 654321,
            productName: 'Chocolate Milk',
            productImage: 'public/images/chocolateMilk.jpg',
            quantity: 5000,
            categoryName: 'Dairy',
            weightVolume: 1,
            unit: 'L',
            rating: 5,
        }
    ]
    };

    res.json(output);
}



function updateProductInformation(req, res) {
    res.status(200).end();
}

function addNewProduct(req, res) {
    res.status(200).end();
}


async function addNewCategory(req, res) {
    try {
        // Extracting input parameters from the request body
        const {
            categoryName,
            categoryImage,
        } = req.body;

        // TODO: Perform any necessary validation or business logic

        // TODO: Save details to the database or perform other actions
        const user = await prisma.category.create({
            data: {
              CategoryName: categoryName,
              Image: categoryImage,
              PopularityStatus: false,  
            },
          });

        // Responding with success
        res.status(201).json({
            success: true,
            message: 'Category created successfully',
        });
    } catch (error) {
        console.error('Error adding category:', error);
        if ( error.code === 'P2002') {
            // P2002 is the Prisma error code for unique constraint violation
            console.error('Duplicate entry error:', error.meta.target);
            res.status(409).json({
              success: false,
              message: 'Conflict: Category with the provided name already exists',
            });
        } else {
            // Responding with server errors
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }
}


function deleteProduct(req, res) {
    res.status(200).end();
}


function deleteCategory(req, res) {
    res.status(200).end();
}


function getProductByCategory(req, res) {
    let output = {
        products: [{
            PID: 123456,
            productName: 'Mojito',
            productImage: 'public/images/mojito.jpg',
            batch : [123456, 256457, 256423],
            quantity: 1000,
            discountRate: 10,
            MID: 123456,
            manufacturerName: 'Fresh',
            manufacturerLogo: 'public/images/fresh.jpg',
            unitPrice: 10,
            weightVolume: 250,
            unit: 'mL',
            rating: 4,
        }
    ]
    };

    res.json(output);

}



function getProductDetails(req, res) {
    let output = {
        product: {
            PID: 123456,
            productName: 'Mojito',
            productImages: ['public/images/mojito.jpg', 'public/images/mojito2.jpg', 'public/images/mojito3.jpg' ],
            batch : [123456, 256457, 256423],
            quantity: 1000,
            MID: 123456,
            manufacturerName: 'Fresh',
            manufacturerLogo: 'public/images/fresh.jpg',
            unitPrice: 10,
            weightVolume: 250,
            unit: 'mL',
            rating: 4,
            reviews: [
                {
                    userName: 'user1',
                    review: 'This is a good product',
                    rating: 4,
                },
                {
                    userName: 'user2',
                    review: 'This is a bad product',
                    rating: 2,
                },
            ],
            description: 'This is a refreshing drink',
            minOrderQuantity: 100,
            minQuantityForDiscount: 150,
            discountRate: 0.2,
            minimumDiscount: 10,
            maximumDiscount: 16,
            productQuantityForDiscountRate: 50,
        }
    };

    res.json(output);

}


module.exports = {
    getOnSaleProducts,
    getRecommendedCategories,
    getAllCategories,
    getProductsByManufacturer,
    updateProductInformation,
    addNewProduct,
    addNewCategory,
    deleteProduct,
    deleteCategory,
    getProductByCategory,
    getProductDetails,
}