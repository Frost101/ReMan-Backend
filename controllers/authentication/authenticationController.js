const express = require('express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
const createToken = (id) => {
    return jwt.sign({ id }, process.env.COOKIE_SECRET, {
        expiresIn: maxAge
    });
};



const prisma = new PrismaClient();

async function retailerLogin(req,res){
    const phoneNumber = req.body.phoneNumber;
    const pass = req.body.password;

    try {
      const user = await prisma.shop.findUnique({
        where: {
          PhoneNumber: phoneNumber,
        },
        select: {
          Password: true,
          ShopID: true,
        },
      });
  
      if (user) {   
        // if(user.Password == pass){
        //    res.status(200).json({ message: 'Login successful'
        //                         , shopId: user.ShopID});
        // }
        // else{
        //     res.status(401).json({ error: 'Invalid username or password' });
        // }

        // bcrypt.compare(pass, user.Password, function(err, result) {
        //     if(result){
        //         res.status(200).json({ message: 'Login successful'
        //                             , shopId: user.ShopID});
        //     }
        //     else{
        //         res.status(401).json({ error: 'Invalid username or password' });
        //     }
        // });


        bcrypt.compare(password, user.Password, function (err, result) {
          if (err) {
              res.status(400).json({ err });
              return;
          }
          else {
              if (result) {
                  const token = createToken(user.ShopID);
                  res.cookie('jwt', token, { maxAge: maxAge * 1000 });
                  res.status(200).json({ message: 'Login successful'
                                              , shopId: user.ShopID});
              }
              else {
                  res.status(400).json({ message: 'Incorrect password' });
                  return;
              }
          }
      });

      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}


async function manufacturerLogin(req,res){
    const email = req.body.email;
    const pass = req.body.password;

    try {
      const user = await prisma.company.findUnique({
        where: {
          Email: email,
        },
        select: {
          Password: true,
          mid: true,
        },
      });
  
      if (user) {   
        if(user.Password == pass){
           res.status(200).json({ message: 'Login successful' 
                                , manufacturerId: user.mid});
        }
        else{
            res.status(401).json({ error: 'Invalid username or password' });
        }
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).end();
}


function logOut(req,res){
    res.status(200).end();
}



module.exports = {
    retailerLogin,
    manufacturerLogin,
    logOut,
};