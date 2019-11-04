module CommonActions
  extend ActiveSupport::Concern

  def set_categories
    @all_categorys = Category.all
  end

  # def getLargeCategoryPath(large_categorys_id)  
  # end

  def getMediumCategorys(large_category_id)
    @categorys = Category.where(large_category_id: large_categorys_id)
    @medium_categorys = MediumCategory.all
  end

  # def getMediumCategoryPath(large_category_id)
  #   @all_categorys = Category.all
  #   @all_categorys[large_categorys_id]
  #   @medium_categorys = MediumCategory.all  
  #   return
  # end

  # def getSmallCategoryPath(large_category_id, medium_category_id)
  #   @all_categorys = Category.all
  #   @all_categorys[large_categorys_id]
  #   @medium_categorys = MediumCategory.all  
  #   return
  # end

  # def getSmallCategorys(large_category_id, medium_category_id)
  #   @all_categorys = Category.all
  #   @all_categorys[large_categorys_id]
  #   @medium_categorys = MediumCategory.all  
  #   return
  # end


end