# Change Log

### 1.8.1 - Active
---------

##### NEW

* Added support for both vertical and horizontal tables (see [`638ec36`](https://github.com/tum-gis/mashup-data-source-service/commit/638ec36161b5d4bb5673636c2e4290854e63c0f9)), where:
    + Horizontal: all object attributes are stored in columns of one single row, which means each ID occurs only once in the table
    + Vertical: each object attribute is stored in one row consisting of three columns `ID`, `Attribute` and `Value`, which means an ID may occur in multiple rows in the table

* The name of the ID column can be defined generically in the JSON object `options` used in the constructor of `DataSource` (see [`5fc514c`](https://github.com/tum-gis/mashup-data-source-service/commit/5fc514c4c27c62d766681856fbbee96c898697e2)), namely:
    + For Google Spreadsheets: the property `options.idColName` should be `A` as the first column of the table, `B` as the second, etc.
    + For PostgreSQL/PostgREST: the property `options.idColName` should be e.g. `gmlid`, `id`, etc. which is the real column name
    
* The SQL code [3DCityDB_PostgREST_VIEW.sql](tools/sql/3DCityDB_PostgREST_VIEW.sql) can extract all thematic and generic attributes of city objects in a vertical VIEW,
where the attributes are exported in the same order as defined in the CityGML schemata, and generic attributes are sorted in ascending alphabetical order.
