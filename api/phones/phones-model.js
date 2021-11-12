const db = require("../../data/dbConfig");

function getPhones() {
  return db("phones as p")
    .leftJoin("companies as c", "p.company_id", "c.company_id")
    .select("p.phone_id", "p.phone_name", "c.company_name");
}

function getPhoneById(id) {
  return db("phones").where("phone_id", id).first();
}

async function add({ phone_name, company_name }) {
  let created_user_id;
  await db.transaction(async (trx) => {
    let company_id_to_use;
    const [company] = await trx("companies").where(
      "company_name",
      company_name
    );
    if (company) {
      company_id_to_use = company.company_id;
    } else {
      const [company_id] = await trx("companies").insert({
        company_name: company_name,
      });
      company_id_to_use = company_id;
    }
    const [user_id] = await trx("phones").insert({
      phone_name,
      company_id: company_id_to_use,
    });
    created_user_id = user_id;
  });
  return getPhoneById(created_user_id);
}

module.exports = {
  getPhones,
  getPhoneById,
  add,
};
