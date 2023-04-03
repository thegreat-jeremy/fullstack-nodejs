module.exports = {
  productList: `select * from product`,
  categoryList: `select * from product_category`,
  categoryDetail: `select * from product_category where product_category_id=?`,
  categoryInsert: `insert into product_category set ?`,
  categoryUpdate: `update product_category set ? where product_category_id=?`,
  categoryDelete: `delete from product_category where product_category_id=?`,
  // insert into product_category set category_name="Etc", category_description="etc", use_yn="Y"
};
