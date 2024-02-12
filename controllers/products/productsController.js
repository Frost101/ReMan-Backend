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
}



async function getProductsByManufacturer(req, res) {

    const userId = req.body.manufacturerId;

    try {
      const products = await prisma.product.findMany({
        where: {
          mid: userId,
        },
        select: {
          pid: true,
          CategoryName: true,
          ProductName: true,
          Image: true,
          Weight_volume: true,
          Unit: true,
          UnitPrice: true,
          Description: true,
          Rating: true,
        },
      });
  
      if (products) {   
        res.status(200).json({products});
      } else {
        res.status(404).json({ error: 'No products found' });
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}



async function getProductsByInventory(req, res) {

  const iid = req.body.iid;

  try {
    const productsInInventory = await prisma.inventoryBatch.groupBy({
      by: ['pid'],
      where: {
        iid: iid,
      },
      _sum: {
        Quantity: true,
      },
    });

    if (productsInInventory) {
      // console.log(productsInInventory.length);
      for(let i = 0; i < productsInInventory.length; i++) {
        const productDetails = await prisma.product.findUnique({
          where: {
            pid: productsInInventory[i].pid,
          },
          select: {
            pid: true,
            CategoryName: true,
            ProductName: true,
            Image: true,
            Weight_volume: true,
            Unit: true,
            UnitPrice: true,
            Description: true,
            Rating: true,
          },
        });
        productsInInventory[i].CategoryName = productDetails.CategoryName;
        productsInInventory[i].ProductName = productDetails.ProductName;
        productsInInventory[i].Image = productDetails.Image;
        productsInInventory[i].Weight_volume = productDetails.Weight_volume;
        productsInInventory[i].Unit = productDetails.Unit;
        productsInInventory[i].UnitPrice = productDetails.UnitPrice;
        productsInInventory[i].Description = productDetails.Description;
        productsInInventory[i].Rating = productDetails.Rating;
        productsInInventory[i].TotalQuantity = productsInInventory[i]._sum.Quantity;
        delete productsInInventory[i]._sum;
      }
      res.status(200).json({productsInInventory});
    } else {
      res.status(404).json({ error: 'No products found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



async function getInventoriesByProduct(req, res) {

  const pid = req.body.pid;

  try {
    const inventories = await prisma.inventoryBatch.findMany({
      where: {
        pid: pid,
        MarketStatus: true,
      },
      distinct: ['iid'],
      select: {
        Inventory: {
          select: {
            iid: true,
            InventoryName: true,
            Image: true,
          }  
        }
      }
    });

    for(let i = 0; i < inventories.length; i++) {
      inventories[i].iid = inventories[i].Inventory.iid;
      inventories[i].InventoryName = inventories[i].Inventory.InventoryName;
      inventories[i].Image = inventories[i].Inventory.Image;
      delete inventories[i].Inventory;
    }

      res.status(200).json({inventories});
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}




async function getProductsByProductionHouse(req, res) {

  const phid = req.body.phid;

  try {
    const productsInProductionHouse = await prisma.productionHouseBatch.groupBy({
      by: ['pid'],
      where: {
        phid: phid,
      },
      _sum: {
        Quantity: true,
      },
    });

    if (productsInProductionHouse) {
      // console.log(productsInInventory.length);
      for(let i = 0; i < productsInProductionHouse.length; i++) {
        const productDetails = await prisma.product.findUnique({
          where: {
            pid: productsInProductionHouse[i].pid,
          },
          select: {
            pid: true,
            CategoryName: true,
            ProductName: true,
            Image: true,
            Weight_volume: true,
            Unit: true,
            UnitPrice: true,
            Description: true,
            Rating: true,
          },
        });
        productsInProductionHouse[i].CategoryName = productDetails.CategoryName;
        productsInProductionHouse[i].ProductName = productDetails.ProductName;
        productsInProductionHouse[i].Image = productDetails.Image;
        productsInProductionHouse[i].Weight_volume = productDetails.Weight_volume;
        productsInProductionHouse[i].Unit = productDetails.Unit;
        productsInProductionHouse[i].UnitPrice = productDetails.UnitPrice;
        productsInProductionHouse[i].Description = productDetails.Description;
        productsInProductionHouse[i].Rating = productDetails.Rating;
        productsInProductionHouse[i].TotalQuantity = productsInProductionHouse[i]._sum.Quantity;
        delete productsInProductionHouse[i]._sum;
      }
      res.status(200).json({productsInProductionHouse});
    } else {
      res.status(404).json({ error: 'No products found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



async function getCategoriesByManufacturer(req, res) {

  const userId = req.body.manufacturerId;

  try {
    const uniqueCategories = await prisma.product.findMany({
      where: {
        mid: userId,
      },
      select: {
        CategoryName: true,
      },
      distinct: ['CategoryName'],
    });

    if (uniqueCategories) {   
      res.status(200).json({uniqueCategories});
    } else {
      res.status(404).json({ error: 'No categories found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



function updateProductInformation(req, res) {
    res.status(200).end();
}

async function addNewProduct(req, res) {
    try {
        // Extracting input parameters from the request body
        const {
            MID,
            CategoryName,
            ProductName,
            Image,
            Weight_Volume,
            Unit,
            UnitPrice,
            Description,
            MinQuantityForSale,
            MinQuantityForDiscount,
            MinimumDiscount,
            MaximumDiscount,
            DiscountRate,
            ProductQuantityForDiscountRate
        } = req.body;

        const user = await prisma.product.create({
            data: {
              mid: MID,
              CategoryName: CategoryName,
              ProductName: ProductName,
              Image: Image,
              Weight_volume: Weight_Volume,
              Unit: Unit,
              UnitPrice: UnitPrice,
              Description: Description,
              Rating: 0.0,
              MinQuantityForSale: MinQuantityForSale,
              MinQuantityForDiscount: MinQuantityForDiscount,
              MinimumDiscount: MinimumDiscount,
              MaximumDiscount: MaximumDiscount,
              DiscountRate: DiscountRate,
              ProductQuantityForDiscountRate: ProductQuantityForDiscountRate,
            },
          });

        // Responding with success
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
        });
    } catch (error) {
        console.error('Error adding inventory:', error);
        if ( error.code === 'P2002') {
            // P2002 is the Prisma error code for unique constraint violation
            console.error('Duplicate entry error:', error.meta.target);
            res.status(409).json({
              success: false,
              message: 'Conflict: Inventory with the provided description already exists',
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


async function deleteProduct(req, res) {

    const userId = req.body.PID;

    try {
      const user = await prisma.product.delete({
        where: {
          pid: userId,
        },
      });
  
      res.status(200).json({success: true,
                             message: 'Product removed successfully'});
    } catch (error) {

      if(error.code === 'P2025') {
        res.status(404).json({ error: 'Product not found' });
      }
      else{ 
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
    // res.status(200).end();
}


async function deleteCategory(req, res) {

    res.status(200).end();
}


async function getProductByCategory(req, res) {

  const CategoryName = req.body.CategoryName;

  try {
    const products = await prisma.product.findMany({
      where: {
        CategoryName: CategoryName,
      },
      select: {
        pid: true,
        ProductName: true,
        Image: true,
        Weight_volume: true,
        Unit: true,
        UnitPrice: true,
        Description: true,
        Rating: true,
        mid: true,
        Company: {
          select: {
            Name: true,
            Logo: true,
          }
        }
      },
    });

    if (products) {
      for(let i = 0; i < products.length; i++) {
        products[i].ManufacturerName = products[i].Company.Name;
        products[i].ManufacturerLogo = products[i].Company.Logo;
        delete products[i].Company;
      }  
      res.status(200).json({products});
    } else {
      res.status(404).json({ error: 'No products found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}




async function getProductInfo(req, res) {

  const pid = req.body.pid;

  try {
    const productInfo = await prisma.product.findUnique({
      where: {
        pid: pid,
      },
      select: {
        CategoryName: true,
        ProductName: true,
        Image: true,
        Weight_volume: true,
        Unit: true,
        UnitPrice: true,
        Description: true,
        Rating: true,
        MinQuantityForSale: true,
        MinQuantityForDiscount: true,
        MinimumDiscount: true,
        MaximumDiscount: true,
        DiscountRate: true,
        ProductQuantityForDiscountRate: true,
        mid: true,
        Company: {
          select: {
            Name: true,
            Logo: true,
          }
        }
      },
    });

    if (productInfo) {
      productInfo.ManufacturerName = productInfo.Company.Name;
      productInfo.ManufacturerLogo = productInfo.Company.Logo;
      delete productInfo.Company;
      
      const totalQuantity = await prisma.inventoryBatch.groupBy({
        by: ['pid'],
        where: {
          pid: pid,
          MarketStatus: true,
          Sale: 0,
        },
        _sum: {
          Quantity: true,
        },
      });
      productInfo.TotalQuantity = totalQuantity[0]._sum.Quantity;
      res.status(200).json({productInfo});
    } else {
      res.status(404).json({ error: 'No products found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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
    getProductsByInventory,
    getInventoriesByProduct,
    getProductsByProductionHouse,
    getCategoriesByManufacturer,
    updateProductInformation,
    addNewProduct,
    addNewCategory,
    deleteProduct,
    deleteCategory,
    getProductByCategory,
    getProductInfo,
    getProductDetails,
}