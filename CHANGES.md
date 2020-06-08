# Change Log

### 1.8.1 - Active
---------

##### NEW

* Added support for KML datasource (see [`d9ade25`](https://github.com/tum-gis/mashup-data-source-service/commit/d9ade25adb200f586f72a2e1a93ec73a36bf9b03)).

* Added support for parsing `SchemaData` besides simple `Data` in KML (see [`fa5d2a2`](https://github.com/tum-gis/mashup-data-source-service/commit/fa5d2a248423576eec93b6e5714ce90327e6ab62)).

* Added option for adding 3rd-party handler (such as Cesium) to use their implementation for retrieving some data (see [`d9ade25`](https://github.com/tum-gis/mashup-data-source-service/commit/d9ade25adb200f586f72a2e1a93ec73a36bf9b03)).

* Added support for both vertical and horizontal tables (see [`638ec36`](https://github.com/tum-gis/mashup-data-source-service/commit/638ec36161b5d4bb5673636c2e4290854e63c0f9)), where:
    + Horizontal: all object attributes are stored in columns of one single row, which means each ID occurs only once in the table
    + Vertical: each object attribute is stored in one row consisting of three columns `ID`, `Attribute` and `Value`, which means an ID may occur in multiple rows in the table

* The name of the ID column can be defined generically in the JSON object `options` used in the constructor of `DataSource` (see [`5fc514c`](https://github.com/tum-gis/mashup-data-source-service/commit/5fc514c4c27c62d766681856fbbee96c898697e2)), namely:
    + For Google Spreadsheets: the property `options.idColName` should be `A` as the first column of the table, `B` as the second, etc.
    + For PostgreSQL/PostgREST: the property `options.idColName` should be e.g. `gmlid`, `id`, etc. which is the real column name
    
* The SQL code [3DCityDB_PostgREST_VIEW.sql](tools/sql/3DCityDB_PostgREST_VIEW.sql) can extract all thematic and generic attributes of city objects in a vertical VIEW,
where the attributes are exported in the same order as defined in the CityGML schemata, and generic attributes are sorted in ascending alphabetical order.
