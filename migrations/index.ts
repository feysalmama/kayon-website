import * as migration_20261009_224902_initial from './20261009_224902_initial';
import * as migration_20261009_225219_allow_empty_image_slots from './20261009_225219_allow_empty_image_slots';
import * as migration_20261010_075954_add_reset_password_requested_at from './20261010_075954_add_reset_password_requested_at';
import * as migration_20261010_120353_add_enquiries_collection from './20261010_120353_add_enquiries_collection';
import * as migration_20261010_212423_add_product_content from './20261010_212423_add_product_content';
import * as migration_20261010_221556_add_support_chat_settings from './20261010_221556_add_support_chat_settings';
import * as migration_20261010_230914_add_product_gallery from './20261010_230914_add_product_gallery';
import * as migration_20261011_190626_add_brands_relationship from './20261011_190626_add_brands_relationship';
import * as migration_20261011_200446_add_new_products from './20261011_200446_add_new_products';
import * as migration_20261011_201151_allow_generated_product_slug from './20261011_201151_allow_generated_product_slug';
import * as migration_20261011_204712_add_developer_website from './20261011_204712_add_developer_website';
import * as migration_20261011_212025_add_institution_projects from './20261011_212025_add_institution_projects';
import * as migration_20261022_065530_add_categories from './20261022_065530_add_categories';

export const migrations = [
  {
    up: migration_20261009_224902_initial.up,
    down: migration_20261009_224902_initial.down,
    name: '20261009_224902_initial',
  },
  {
    up: migration_20261009_225219_allow_empty_image_slots.up,
    down: migration_20261009_225219_allow_empty_image_slots.down,
    name: '20261009_225219_allow_empty_image_slots',
  },
  {
    up: migration_20261010_075954_add_reset_password_requested_at.up,
    down: migration_20261010_075954_add_reset_password_requested_at.down,
    name: '20261010_075954_add_reset_password_requested_at',
  },
  {
    up: migration_20261010_120353_add_enquiries_collection.up,
    down: migration_20261010_120353_add_enquiries_collection.down,
    name: '20261010_120353_add_enquiries_collection',
  },
  {
    up: migration_20261010_212423_add_product_content.up,
    down: migration_20261010_212423_add_product_content.down,
    name: '20261010_212423_add_product_content',
  },
  {
    up: migration_20261010_221556_add_support_chat_settings.up,
    down: migration_20261010_221556_add_support_chat_settings.down,
    name: '20261010_221556_add_support_chat_settings',
  },
  {
    up: migration_20261010_230914_add_product_gallery.up,
    down: migration_20261010_230914_add_product_gallery.down,
    name: '20261010_230914_add_product_gallery',
  },
  {
    up: migration_20261011_190626_add_brands_relationship.up,
    down: migration_20261011_190626_add_brands_relationship.down,
    name: '20261011_190626_add_brands_relationship',
  },
  {
    up: migration_20261011_200446_add_new_products.up,
    down: migration_20261011_200446_add_new_products.down,
    name: '20261011_200446_add_new_products',
  },
  {
    up: migration_20261011_201151_allow_generated_product_slug.up,
    down: migration_20261011_201151_allow_generated_product_slug.down,
    name: '20261011_201151_allow_generated_product_slug',
  },
  {
    up: migration_20261011_204712_add_developer_website.up,
    down: migration_20261011_204712_add_developer_website.down,
    name: '20261011_204712_add_developer_website',
  },
  {
    up: migration_20261011_212025_add_institution_projects.up,
    down: migration_20261011_212025_add_institution_projects.down,
    name: '20261011_212025_add_institution_projects',
  },
  {
    up: migration_20261022_065530_add_categories.up,
    down: migration_20261022_065530_add_categories.down,
    name: '20261022_065530_add_categories'
  },
];
