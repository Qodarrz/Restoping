const { Menu, MenuDetail } = require("../models");
const fs = require("fs");
const path = require("path");
const db = require("../config/database");


// ✅ GET all menus (include detail)
exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll(); // No include
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch menus", error: err });
  }
};

exports.getMenu = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id, {
      include: [{ model: MenuDetail }],
    });
    if (!menu) return res.status(404).json({ message: "Menu not found" });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: "Failed to get menu", error: err });
  }
};

exports.createMenu = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      ingredients,
      calories,
      serving_size,
    } = req.body;
    const image = req.file ? `${req.body.image}` : null;


    const result = await db.transaction(async (t) => {
      // Buat Menu terlebih dahulu
      const newMenu = await Menu.create(
        {
          name,
          description,
          price,
          category,
          image,
        },
        { transaction: t }
      );

      // Kemudian buat MenuDetail dengan menu_id yang didapat dari newMenu
      const newMenuDetail = await MenuDetail.create(
        {
          menu_id: newMenu.id,
          ingredients,
          calories,
          serving_size,
        },
        { transaction: t }
      );

      return { menu: newMenu, menuDetail: newMenuDetail };
    });

    res.status(201).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create menu", error: err.message });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    const { name, description, price, category } = req.body;
    let image = menu.image;

    if (req.file) {
      const oldPath = path.join(__dirname, `../public${image}`);
      if (image && fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
      image = `/uploads/${req.file.filename}`;
    }

    await menu.update({ name, description, price, category, image });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: "Failed to update menu", error: err });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    if (menu.image) {
      const imagePath = path.join(__dirname, `../public${menu.image}`);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await menu.destroy();
    res.json({ message: "Menu deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete menu", error: err });
  }
};
