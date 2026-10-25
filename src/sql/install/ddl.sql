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

SET FOREIGN_KEY_CHECKS=0;
INSERT INTO `ds` (`allowform`,`autosave`,`base_store_class`,`class_name`,`combined`,`default_pagesize`,`displayfield`,`existsreal`,`form_on_double_click`,`globalsearch`,`listselectionmodel`,`listviewbaseclass`,`list_on_append`,`modelbaseclass`,`phpexporter`,`phpexporterfilename`,`read_table`,`searchany`,`searchfield`,`showactionbtn`,`sortdirection`,`sortfield`,`syncable`,`table_name`,`title`,`use_history`,`use_insert_for_update`) VALUES ('0','0','Tualo.DataSets.data.Store','Datenstamm','0','1000','id','1','1','0','cellmodel','Tualo.DataSets.ListView','0','Tualo.DataSets.model.Basic','XlsxWriter','pugjs_files {DATE} {TIME}','view_readtable_pugjs_files','1','allowed','1','ASC','id','0','pugjs_files','PugJS-Files','0','1') ON DUPLICATE KEY UPDATE `allowform`=values(`allowform`),`autosave`=values(`autosave`),`base_store_class`=values(`base_store_class`),`class_name`=values(`class_name`),`combined`=values(`combined`),`default_pagesize`=values(`default_pagesize`),`displayfield`=values(`displayfield`),`existsreal`=values(`existsreal`),`form_on_double_click`=values(`form_on_double_click`),`globalsearch`=values(`globalsearch`),`listselectionmodel`=values(`listselectionmodel`),`listviewbaseclass`=values(`listviewbaseclass`),`list_on_append`=values(`list_on_append`),`modelbaseclass`=values(`modelbaseclass`),`phpexporter`=values(`phpexporter`),`phpexporterfilename`=values(`phpexporterfilename`),`read_table`=values(`read_table`),`searchany`=values(`searchany`),`searchfield`=values(`searchfield`),`showactionbtn`=values(`showactionbtn`),`sortdirection`=values(`sortdirection`),`sortfield`=values(`sortfield`),`syncable`=values(`syncable`),`table_name`=values(`table_name`),`title`=values(`title`),`use_history`=values(`use_history`),`use_insert_for_update`=values(`use_insert_for_update`); 
INSERT IGNORE INTO `ds_column` (`character_maximum_length`,`column_key`,`column_name`,`column_type`,`data_type`,`default_max_value`,`default_min_value`,`deferedload`,`existsreal`,`fieldtype`,`is_generated`,`is_nullable`,`is_primary`,`numeric_precision`,`numeric_scale`,`privileges`,`syncable`,`table_name`,`writeable`) VALUES ('0','','allowed','tinyint(1)','tinyint','0','0','0','1','','NEVER','NO','0','3','0','select,insert,update,references','0','pugjs_files','1') ; 
INSERT IGNORE INTO `ds_column` (`character_maximum_length`,`character_set_name`,`column_key`,`column_name`,`column_type`,`data_type`,`default_max_value`,`default_min_value`,`deferedload`,`existsreal`,`fieldtype`,`is_generated`,`is_nullable`,`is_primary`,`numeric_precision`,`numeric_scale`,`privileges`,`syncable`,`table_name`,`writeable`) VALUES ('50','utf8mb4','PRI','id','varchar(50)','varchar','0','0','0','1','','NEVER','NO','1','0','0','select,insert,update,references','0','pugjs_files','1') ; 
INSERT IGNORE INTO `ds_column_list_label` (`active`,`align`,`column_name`,`config`,`editor`,`filterstore`,`flex`,`formatter`,`grouped`,`hidden`,`label`,`language`,`listfiltertype`,`position`,`renderer`,`summaryrenderer`,`summarytype`,`table_name`,`xtype`) VALUES ('1','left','allowed','{}','','','1','','0','0','erlaubt','DE','','1','','','','pugjs_files','checkcolumn') ; 
INSERT IGNORE INTO `ds_column_list_label` (`active`,`align`,`column_name`,`config`,`editor`,`filterstore`,`flex`,`formatter`,`grouped`,`hidden`,`label`,`language`,`listfiltertype`,`position`,`renderer`,`summaryrenderer`,`summarytype`,`table_name`,`xtype`) VALUES ('1','left','id','{}','','','1','','0','0','Template','DE','','0','','','','pugjs_files','gridcolumn') ; 
INSERT IGNORE INTO `ds_column_form_label` (`active`,`allowempty`,`column_name`,`fieldgroup`,`field_path`,`flex`,`hidden`,`label`,`language`,`position`,`table_name`,`xtype`) VALUES ('1','0','allowed','','Allgemein/Angaben','1','0','erlaubt','DE','1','pugjs_files','checkbox') ; 
INSERT IGNORE INTO `ds_column_form_label` (`active`,`allowempty`,`column_name`,`fieldgroup`,`field_path`,`flex`,`hidden`,`label`,`language`,`position`,`table_name`,`xtype`) VALUES ('1','0','id','','Allgemein/Angaben','1','0','Template','DE','0','pugjs_files','displayfield') ; 
INSERT IGNORE INTO `ds_access` (`append`,`delete`,`read`,`role`,`table_name`,`write`) VALUES ('0','0','0','_default_','pugjs_files','1') ; 
INSERT IGNORE INTO `ds_access` (`append`,`delete`,`read`,`role`,`table_name`,`write`) VALUES ('0','0','0','administration','pugjs_files','1') ; 
REPLACE INTO `docsystem_ds` (`table_name`) VALUES ('pugjs_files') ; 
SET FOREIGN_KEY_CHECKS=1;