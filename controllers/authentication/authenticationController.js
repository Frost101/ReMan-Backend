const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function retailerLogin(req,res){
    const phoneNumber = '01700000000';
    const pass = '12345';

    try {
      const user = await prisma.shop.findUnique({
        where: {
          PhoneNumber: phoneNumber,
        },
        select: {
          Password: true,
        },
      });
  
      if (user) {   
        if(user.Password == pass){
           res.status(200).json({ message: 'Login successful' });
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
        },
      });
  
      if (user) {   
        if(user.Password == pass){
           res.status(200).json({ message: 'Login successful' });
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