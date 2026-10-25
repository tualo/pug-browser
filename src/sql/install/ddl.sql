DELIMITER //

CREATE TABLE IF NOT EXISTS `pugjs_files` (
  `id` varchar(50) NOT NULL,
  `allowed` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_pugjs_files_id`
    FOREIGN KEY (`id`) REFERENCES `ds_pug_templates`(`id`)
)//

create or replace view view_readtable_pugjs_files as
select 
    ds_pug_templates.id,
    ifnull(allowed, 0) as allowed,
    ds_pug_templates.`template`
from 
    ds_pug_templates
    left join pugjs_files using(id)
//
call fill_ds_column('pugjs_files');
call fill_ds_column('view_readtable_pugjs_files');
call fill_ds_column('pugjs_files');
