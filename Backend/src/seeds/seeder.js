exports.seed = async function (knex) {
  // Hapus dulu datanya (perhatikan urutan agar tidak konflik foreign key)
  await knex("menu_details").del();
  await knex("menus").del();

  // Insert ke tabel menus
  await knex("menus").insert([
    {
      name: "Nasi Goreng Spesial",
      description: "Nasi goreng dengan ayam, telur, dan sayuran.",
      price: 15000,
      category: "food",
      image: "/public/images/makanan1.png",
    },
    {
      name: "Mie Ayam Bakso",
      description: "Mie ayam lengkap dengan bakso dan sayur.",
      price: 17000,
      category: "food",
      image: "/public/images/makanan1.png",
    },
    {
      name: "Es Teh Manis",
      description: "Minuman teh manis dengan es batu.",
      price: 5000,
      category: "drink",
      image: "/public/images/minuman2.png",
    },
    {
      name: "Jus Alpukat",
      description: "Minuman jus alpukat segar.",
      price: 10000,
      category: "drink",
      image: "/public/images/minuman1.png",
    },
    {
      name: "Ayam Geprek",
      description: "Ayam geprek pedas dengan nasi.",
      price: 18000,
      category: "food",
      image: "/public/images/makanan2.png",
    },
  ]);

  const menus = await knex("menus").select("id", "name");

  const menuMap = {};
  menus.forEach((menu) => {
    menuMap[menu.name] = menu.id;
  });

  // Insert ke tabel menu_details
  await knex("menu_details").insert([
    {
      menu_id: menuMap["Nasi Goreng Spesial"],
      ingredients:
        "Nasi, telur, ayam, wortel, daun bawang, kecap, bawang putih",
      calories: 550,
      serving_size: "1 porsi",
    },
    {
      menu_id: menuMap["Mie Ayam Bakso"],
      ingredients: "Mie, ayam, bakso, sawi, bawang goreng, kecap, minyak ayam",
      calories: 600,
      serving_size: "1 mangkok",
    },
    {
      menu_id: menuMap["Es Teh Manis"],
      ingredients: "Teh, gula, es batu",
      calories: 120,
      serving_size: "250 ml",
    },
    {
      menu_id: menuMap["Jus Alpukat"],
      ingredients: "Alpukat, susu kental manis, gula, es batu",
      calories: 300,
      serving_size: "300 ml",
    },
    {
      menu_id: menuMap["Ayam Geprek"],
      ingredients: "Ayam goreng tepung, sambal, nasi, mentimun",
      calories: 700,
      serving_size: "1 porsi",
    },
  ]);
};
