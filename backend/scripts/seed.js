import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import products from "../data/products.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    const categoryNames = [...new Set(products.map((p) => p.categoryName.trim()))];

    const existingCategories = await Category.find({ name: { $in: categoryNames } });
    const existingMap = new Map(existingCategories.map((c) => [c.name, c._id]));

    for (const name of categoryNames) {
      if (!existingMap.has(name)) {
        const created = await Category.create({ name });
        existingMap.set(name, created._id);
      }
    }

    let inserted = 0;
    let updated = 0;

    for (const p of products) {
      const { categoryName, ...rest } = p;
      const categoryId = existingMap.get(categoryName);
      const data = { ...rest, category: categoryId };

      const existing = await Product.findOne({ name: data.name });
      if (existing) {
        existing.image = data.image;
        existing.brand = data.brand;
        existing.quantity = data.quantity;
        existing.category = data.category;
        existing.description = data.description;
        existing.price = data.price;
        existing.countInStock = data.countInStock;
        await existing.save();
        updated += 1;
      } else {
        await Product.create(data);
        inserted += 1;
      }
    }

    console.log(`Seeding complete. Inserted: ${inserted}, Updated: ${updated}`);
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

seed();
