DROP VIEW IF EXISTS
	view_all_building_attributes,
    view_building_attributes,
    view_generic_attributes,
    view_cityobject_attributes;

CREATE VIEW view_generic_attributes (gmlid, attribute, value) AS
    (SELECT cityobject.gmlid, CONCAT('gen:', cityobject_genericattrib.attrname) AS attrname, cityobject_genericattrib.strval, 1 AS order_vga FROM cityobject, cityobject_genericattrib
    WHERE cityobject.id = cityobject_genericattrib.cityobject_id
    AND cityobject_genericattrib.datatype = 1)
    UNION
    (SELECT cityobject.gmlid, CONCAT('gen:', cityobject_genericattrib.attrname) AS attrname, cityobject_genericattrib.intval::varchar(255), 1 AS order_vga FROM cityobject, cityobject_genericattrib
    WHERE cityobject.id = cityobject_genericattrib.cityobject_id
    AND cityobject_genericattrib.datatype = 2)
    UNION
    (SELECT cityobject.gmlid, CONCAT('gen:', cityobject_genericattrib.attrname) AS attrname, cityobject_genericattrib.realval::varchar(255), 1 AS order_vga FROM cityobject, cityobject_genericattrib
    WHERE cityobject.id = cityobject_genericattrib.cityobject_id
    AND cityobject_genericattrib.datatype = 3)
    UNION
    (SELECT cityobject.gmlid, CONCAT('gen:', cityobject_genericattrib.attrname) AS attrname, cityobject_genericattrib.urival, 1 AS order_vga FROM cityobject, cityobject_genericattrib
    WHERE cityobject.id = cityobject_genericattrib.cityobject_id
    AND cityobject_genericattrib.datatype = 4)
    UNION
    (SELECT cityobject.gmlid, CONCAT('gen:', cityobject_genericattrib.attrname) AS attrname, cityobject_genericattrib.dateval::varchar(255), 1 AS order_vga FROM cityobject, cityobject_genericattrib
    WHERE cityobject.id = cityobject_genericattrib.cityobject_id
    AND cityobject_genericattrib.datatype = 5)
    ORDER BY attrname;

CREATE VIEW view_cityobject_attributes (gmlid, attribute, value) AS
	(SELECT cityobject.gmlid, 'name', cityobject.name, 1 AS order_vca FROM cityobject, building
    WHERE cityobject.id = building.id)
    UNION
    (SELECT cityobject.gmlid, 'description', cityobject.description, 2 AS order_vca FROM cityobject, building
    WHERE cityobject.id = building.id)
    UNION
    (SELECT cityobject.gmlid, 'creation_date', cityobject.creation_date::varchar(255), 3 order_vca FROM cityobject, building
    WHERE cityobject.id = building.id)
    UNION
    (SELECT cityobject.gmlid, 'termination_date', cityobject.termination_date::varchar(255), 4 order_vca FROM cityobject, building
    WHERE cityobject.id = building.id)
    UNION
    (SELECT cityobject.gmlid, 'relative_to_terrain', cityobject.relative_to_terrain::varchar(255), 5 order_vca FROM cityobject, building
    WHERE cityobject.id = building.id)
    UNION
    (SELECT cityobject.gmlid, 'relative_to_water', cityobject.relative_to_water::varchar(255), 6 AS order_vca FROM cityobject, building
    WHERE cityobject.id = building.id)
    UNION
    --(SELECT cityobject.gmlid, 'last_modification_date', cityobject.last_modification_date::varchar(255), 7 AS order_vca FROM cityobject, building
    --WHERE cityobject.id = building.id)
    --UNION
    (SELECT cityobject.gmlid, 'reason_for_update', cityobject.reason_for_update, 8 AS order_vca FROM cityobject, building
    WHERE cityobject.id = building.id)
    ORDER BY order_vca;
    
CREATE VIEW view_building_attributes (gmlid, attribute, value) AS
    (SELECT cityobject.gmlid, 'class', building.class, 1 AS order_vba FROM cityobject, building
    WHERE cityobject.id = building.id)
    UNION
    (SELECT cityobject.gmlid, 'function', building.function, 2 AS order_vba FROM cityobject, building
    WHERE cityobject.id = building.id)
    UNION
    (SELECT cityobject.gmlid, 'usage', building.usage, 3 AS order_vba FROM cityobject, building
    WHERE cityobject.id = building.id)
    UNION
    (SELECT cityobject.gmlid, 'year_of_construction', building.year_of_construction::varchar(255), 4 AS order_vba FROM cityobject, building
    WHERE cityobject.id = building.id)
    UNION
    (SELECT cityobject.gmlid, 'year_of_demolition', building.year_of_demolition::varchar(255), 5 AS order_vba FROM cityobject, building
    WHERE cityobject.id = building.id)
    UNION
    (SELECT cityobject.gmlid, 'roof_type', building.roof_type, 6 AS order_vba FROM cityobject, building
    WHERE cityobject.id = building.id)
    UNION
    (SELECT cityobject.gmlid, 'measured_height', CONCAT(building.measured_height::varchar(255), building.measured_height_unit), 7 AS order_vba FROM cityobject, building
    WHERE cityobject.id = building.id)
    UNION
    (SELECT cityobject.gmlid, 'storeys_above_ground', building.storeys_above_ground::varchar(255), 8 AS order_vba FROM cityobject, building
    WHERE cityobject.id = building.id)
    UNION
    (SELECT cityobject.gmlid, 'storeys_below_ground', building.storeys_below_ground::varchar(255), 9 AS order_vba FROM cityobject, building
    WHERE cityobject.id = building.id)
    UNION
    (SELECT cityobject.gmlid, 'storey_heights_above_ground', CONCAT(building.storey_heights_above_ground::varchar(255), building.storey_heights_ag_unit), 10 AS order_vba FROM cityobject, building
    WHERE cityobject.id = building.id)
    UNION
    (SELECT cityobject.gmlid, 'storey_heights_below_ground', CONCAT(building.storey_heights_below_ground::varchar(255), building.storey_heights_bg_unit), 11 AS order_vba FROM cityobject, building
    WHERE cityobject.id = building.id)
    ORDER BY order_vba;
    
CREATE VIEW view_all_building_attributes (gmlid, attribute, value) AS
	SELECT * FROM
	(
        (SELECT *, 1 AS order_all FROM view_cityobject_attributes WHERE value IS NOT NULL AND value <> '')
    	UNION ALL
    	(SELECT *, 2 AS order_all FROM view_building_attributes WHERE value IS NOT NULL AND value <> '')
    	UNION ALL
    	(SELECT *, 3 AS order_all FROM view_generic_attributes WHERE value IS NOT NULL AND value <> '')
    ) AS union_views
    ORDER BY order_all;
