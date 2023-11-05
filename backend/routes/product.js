const express = require("express");
const models = require("../models");
const { StatusCodes } = require("http-status-codes");
const { ErrorHandler } = require("../helpers/errorHandler");
const VerifyToken = require("../middlewares/verifyToken");
const router = express.Router();
require("dotenv").config();

router.get('/calculate-cost', async (req, res) => {

  const consumption = parseInt(req.query.consumption, 10);
  if (isNaN(consumption)) {
    return res.status(400).json({ error: 'Invalid consumption value' });
  }

  try {
    const tariffs = await models.Product.findAll();

    const results = tariffs.map((tariff) => ({
      name: tariff.name,
      type: tariff.type,
      included_kwh: tariff.included_kwh,
      base_cost: tariff.base_cost,
      additional_kwh_cost: tariff.additional_kwh_cost,
      annualCost: calculateAnnualCosts(consumption, tariff),
      monthlyCost: (calculateAnnualCosts(consumption, tariff) / 12).toFixed(2),
    }));

    res.status(200).json({ status: 1, data: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 0, error: 'Internal server error' });
  }
});

function calculateAnnualCosts(consumption, tariff) {
  if (tariff.type === 1) {
    const baseCost = tariff.base_cost * 12;
    const consumptionCost = (tariff.additional_kwh_cost * consumption) / 100;
    return baseCost + consumptionCost;
  }
  else if (tariff.type === 2) {
    if (consumption <= tariff.included_kwh) {
      return tariff.base_cost;
    }
    else {
      const extraConsumption = consumption - tariff.included_kwh;
      return tariff.base_cost + (extraConsumption * tariff.additional_kwh_cost) / 100;
    }
  }
  return 0; // Default to 0 for unknown tariff types
}

router.post('/insert-product', VerifyToken, async (req, res) => {
  try {
    // Extract data from the request body
    const {
      name,
      type,
      included_kwh,
      base_cost,
      additional_kwh_cost,
    } = req.body;

    // Create a new product record
    const product = await models.Product.create({
      name,
      type,
      included_kwh,
      base_cost,
      additional_kwh_cost,
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(200).json({ status: 1, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/update-product/:id', VerifyToken, async (req, res) => {
  try {
    // Extract the product ID from the URL parameters
    const productId = req.params.id;

    // Extract the data to update from the request body
    const {
      name,
      type,
      included_kwh,
      base_cost,
      additional_kwh_cost,
    } = req.body;

    // Find the existing product record by ID
    const product = await models.Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the product record with the new data
    product.name = name;
    product.type = type;
    product.included_kwh = included_kwh;
    product.base_cost = base_cost;
    product.additional_kwh_cost = additional_kwh_cost;
    product.updated_at = new Date();

    // Save the updated product record
    await product.save();

    res.status(200).json({ status: 1, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/delete-products', VerifyToken, async (req, res) => {
  try {
    const productIds = req.body.productIds;

    if (!productIds || !Array.isArray(productIds)) {
      return res.status(400).json({ error: 'Invalid or missing productIds array' });
    }

    // Delete the products with the specified IDs
    const deletedProducts = await models.Product.destroy({
      where: {
        id: productIds,
      },
    });

    res.status(200).json({ status: 1, message: 'Products deleted successfully', deletedCount: deletedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/get-products', VerifyToken, async (req, res) => {
  try {
    const products = await models.Product.findAll();

    res.status(200).json({ status: 1, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
